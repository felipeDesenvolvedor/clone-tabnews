import { createRouter } from "next-connect";
import controller from "infra/controller";
import migrator from "models/migrator";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler({ ...controller.errorHandler });

// vai retornar as migrations que ainda não foram aplicadas
async function getHandler(request, response) {
  const peddingMigrations = await migrator.listPedingMigrations();
  return response.status(200).json(peddingMigrations);
}
async function postHandler(request, response) {
  const migratedMigrations = await migrator.runPeddingMigrations();

  if (migratedMigrations.length > 0) {
    return response.status(201).json(migratedMigrations);
  }

  return response.status(200).json(migratedMigrations);
}
