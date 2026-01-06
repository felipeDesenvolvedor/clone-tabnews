test("Get to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  console.log("response", response);
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);
  expect(responseBody.postgres_version).toBeDefined();
  expect(responseBody.postgres_version).toEqual(18.0);
  expect(responseBody.postgres_max_connections).toEqual(
    responseBody.postgres_max_connections,
  );
  expect(responseBody.postgres_used_connections).toEqual(2);
  expect(responseBody).not.toHaveProperty("password");
});
