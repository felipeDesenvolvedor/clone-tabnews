import { resolve } from "node:path";
import database from "infra/database";
import migrationRunner from "node-pg-migrate";

const migrationsRunnerConfig = {
  databaseUrl: process.env.DATABASE_URL,
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function listPedingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const peddingMigrations = await migrationRunner({
      ...migrationsRunnerConfig,
      dbClient,
    });

    return peddingMigrations;
  } finally {
    await dbClient?.end();
  }
}

async function runPeddingMigrations() {
  let dbClient;

  try {
    dbClient = await database.getNewClient();

    const migratedMigrations = await migrationRunner({
      ...migrationsRunnerConfig,
      dbClient,
      dryRun: false,
    });

    return migratedMigrations;
  } finally {
    await dbClient?.end();
  }
}

const migrator = {
  listPedingMigrations,
  runPeddingMigrations,
};

export default migrator;
