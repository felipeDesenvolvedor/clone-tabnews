import { version as versionUUID } from "uuid";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.awaitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPeddingMigrations();
});

describe("Post /api/v1/users", () => {
  describe("Anonymouns user", () => {
    test("With unique and valid data", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "felipe.santos",
          email: "felipe.santos@example.com",
          password: "password123",
        }),
      });

      const response1Body = await response1.json();

      expect(response1Body).toEqual({
        id: response1Body.id,
        username: "felipe.santos",
        email: "felipe.santos@example.com",
        password: "password123",
        created_at: response1Body.created_at,
        updated_at: response1Body.updated_at,
      });

      expect(versionUUID(response1Body.id)).toBe(4);
      expect(Date.parse(response1Body.created_at)).not.toBeNaN();
      expect(Date.parse(response1Body.updated_at)).not.toBeNaN();
    });
  });
});
