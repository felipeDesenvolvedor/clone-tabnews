import database from "../../../../infra/database.js";
async function status(request, response) {
  const res = await database.query("SELECT 1 + 1 as sum;");
  response.status(200).json({ chave: "Acima da média" });
}

export default status;
