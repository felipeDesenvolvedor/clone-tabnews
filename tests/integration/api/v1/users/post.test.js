import orchestrator from "tests/orchestrator.js";
import database from "infra/database.js";

beforeAll(async () => {
  await orchestrator.awaitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPeddingMigrations();
});

describe("Post /api/v1/users", () => {
  describe("Anonymouns user", () => {
    test("With unique and valid data", async () => {
      await database.query({
        text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);",
        values: ["felipe.santos", "felipe.santos@example.com", "password123"],
      });
      await database.query({
        text: "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);",
        values: ["felipe.santos2", "Felipe.santos@example.com", "password456"],
      });

      const users = await database.query("SELECT * FROM users;");
      console.log("users", users.rows);

      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
      });
      expect(response1.status).toBe(201);

      const response1Body = await response1.json();
      expect(Array.isArray(response1Body)).toBe(true);
      expect(response1Body.length).toBeGreaterThan(0);
    });
  });
});
