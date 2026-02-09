import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DataBaseStatus />
    </>
  );
}

export default StatusPage;

function UpdatedAt() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  return (
    <div>
      Última atualização: {Date(data?.updated_at).toLocaleString("pt-BR")}
    </div>
  );
}
function PostgresVersion({ postgresVersion }) {
  return <div>Versão do PostgreSQL: {postgresVersion}</div>;
}
function PostgresUsedConnections({ postgresUsedConnections }) {
  return <div>Conexões usadas: {postgresUsedConnections}</div>;
}
function PostgresMaxConnections({ postgresMaxConnections }) {
  return <div>Conexões máximas: {postgresMaxConnections}</div>;
}

function DataBaseStatus() {
  const { data, isLoading } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  return (
    <>
      {isLoading ? (
        "Carregando..."
      ) : (
        <>
          <PostgresVersion postgresVersion={data.postgres_version} />
          <PostgresUsedConnections
            postgresUsedConnections={data.postgres_used_connections}
          />
          <PostgresMaxConnections
            postgresMaxConnections={data.postgres_max_connections}
          />
        </>
      )}
    </>
  );
}
