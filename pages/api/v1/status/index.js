import database from "infra/database.js";
import { InternalServerError } from "infra/errors.js";

async function status(request, response) {
  try {
    const updatedAt = new Date().toISOString();

    // 1) Query sem parâmetros - não passivel de SQL Injection
    const postgresVersion = await database.query("show server_version;");
    const postgresMaxConnections = await database.query(
      "show max_connections;",
    );

    // 2) Query com parâmetros fixos - mais flexivel e seguro contra SQL Injection, pois não aceita input dinâmico.

    // 3) Query com parâmetros dinâmicos - seguro contra SQL Injection, pois utiliza prepared statements. Mas pode ser menos seguro se os parâmetros forem construídos dinamicamente de forma insegura.
    const databaseName = process.env.POSTGRES_DB;
    const postgresUsedConnections = await database.query(
      // "SELECT count(*) from pg_stat_activity WHERE datname = 'local_db';",
      {
        text: "SELECT count(*)::int from pg_stat_activity WHERE datname = $1;",
        values: [databaseName],
      },
    );

    response.status(200).json({
      updated_at: updatedAt,
      postgres_version: parseInt(postgresVersion.rows[0].server_version),
      postgres_max_connections: parseInt(
        postgresMaxConnections.rows[0].max_connections,
      ),
      postgres_used_connections: postgresUsedConnections.rows[0].count,
    });
  } catch (error) {
    const publicObjectError = new InternalServerError({
      cause: error,
    });

    console.log("\n Erro dentro do controller /status:");
    console.error(publicObjectError);
    response.status(500).json(publicObjectError);
  }
}

export default status;
