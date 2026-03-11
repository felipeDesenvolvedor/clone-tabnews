import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user.js";

const router = createRouter();

router.get(getHandler);

export default router.handler({ ...controller.errorHandler });

async function getHandler(request, response) {
  // api/v1/users/[username]
  const username = request.query.username;
  const userFound = await user.findOneByUserName(username);
  return response.status(200).json(userFound);
}
