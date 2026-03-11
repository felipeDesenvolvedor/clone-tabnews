import retry from "async-retry";
import database from "infra/database.js";
import migrator from "models/migrator.js";

async function awaitForAllServices() {
  await awaitForWebService();

  async function awaitForWebService() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPeddingMigrations() {
  await migrator.runPeddingMigrations();
}

const orchestrator = {
  awaitForAllServices,
  clearDatabase,
  runPeddingMigrations,
};

export default orchestrator;
