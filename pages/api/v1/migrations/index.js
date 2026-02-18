import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";

const router = createRouter();

router.get(migrationsHandler);
router.post(migrationsHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onErrorHandler(error, request, response) {
  const publicObjectError = new InternalServerError({
    cause: error,
  });

  console.log("\n Erro dentro do catch do next-connect onErrorHandler:");
  console.error(publicObjectError);
  response.status(500).json(publicObjectError);
}

function onNoMatchHandler(request, response) {
  const publicObjectError = new MethodNotAllowedError();
  response.status(publicObjectError.statusCode).json(publicObjectError);
}

// vai retornar as migrations que ainda não foram aplicadas
async function migrationsHandler(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migrationsRunnerConfig = {
      dbClient: dbClient,
      databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const peddingMigrations = await migrationRunner(migrationsRunnerConfig);

      return response.status(200).json(peddingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...migrationsRunnerConfig,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await dbClient?.end();
  }
}
