test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);
  expect(responseBody.postgres_version).toBeDefined();
  expect(responseBody.postgres_version).toEqual(16.0);
  expect(responseBody.postgres_max_connections).toEqual(100);
  expect(responseBody.postgres_used_connections).toEqual(1);
  expect(responseBody).not.toHaveProperty("password");
});

test.only("Teste de SQL injection", async () => {
  await fetch("http://localhost:3000/api/v1/status?databaseName=local_db");

  // Exemplo de SQL Injection
  await fetch(
    "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4); --",
  );
});
