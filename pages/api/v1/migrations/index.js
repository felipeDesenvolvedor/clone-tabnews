import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import controller from "infra/controller";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler({ ...controller.errorHandler });

const migrationsRunnerConfig = {
  databaseUrl: process.env.DATABASE_URL,
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

// vai retornar as migrations que ainda não foram aplicadas
async function getHandler(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const peddingMigrations = await migrationRunner({
      ...migrationsRunnerConfig,
      dbClient,
    });

    return response.status(200).json(peddingMigrations);
  } finally {
    await dbClient?.end();
  }
}
async function postHandler(request, response) {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...migrationsRunnerConfig,
      dbClient,
      dryRun: false,
    });

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  } finally {
    await dbClient?.end();
  }
}
