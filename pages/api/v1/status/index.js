import database from "infra/database.js";
async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const postgresVersion = await database.query("show server_version;");
  const postgresMaxConnections = await database.query("show max_connections;");
  const databaseName = process.env.POSTGRES_DB;
  const postgresUsedConnections = await database.query(
    // "SELECT count(*) from pg_stat_activity WHERE datname = 'local_db';",
    {
      text: "SELECT count(*) from pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    },
  );

  response.status(200).json({
    updated_at: updatedAt,
    postgres_version: parseInt(postgresVersion.rows[0].server_version),
    postgres_max_connections: parseInt(
      postgresMaxConnections.rows[0].max_connections,
    ),
    postgres_used_connections: parseInt(postgresUsedConnections.rows[0].count),
  });
}

export default status;
