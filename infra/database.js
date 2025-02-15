import { Client } from "pg";
async function query(querySearch) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === 'development' ? false : true,
  });
  // Nessas variaveis de ambiente,
  // viram os valores de onde a aplicação estiver hospedada ou rodando
  try {
    await client.connect();
    const res = await client.query(querySearch);
    return res;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
