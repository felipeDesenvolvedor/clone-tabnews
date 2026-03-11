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
    test("With duplicate 'email'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailduplicado1",
          email: "emailduplicado1@gmail.com",
          password: "password123",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailduplicado2",
          email: "emailduplicado1@gmail.com",
          password: "password123",
        }),
      });

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        name: "ValidationError",
        action: "Ultilize outro email para realizar o cadastro.",
        status_code: 400,
        message: "O email informado já está sendo utilizado.",
      });
    });
    test("With duplicate 'username'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "userduplicado1",
          email: "userduplicado1@gmail.com",
          password: "password123",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "userduplicado1",
          email: "userduplicado2@gmail.com",
          password: "password123",
        }),
      });

      expect(response2.status).toBe(400);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        message: "O usuário informado já está sendo ultilizado.",
        action: "Ultilize outro usuário para realizar o cadastro.",
        name: "ValidationError",
        status_code: 400,
      });
    });
  });
});
