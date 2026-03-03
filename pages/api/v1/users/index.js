import { createRouter } from "next-connect";
import controller from "infra/controller";
import user from "models/user.js";

const router = createRouter();

router.post(postHandler);

export default router.handler({ ...controller.errorHandler });

async function postHandler(request, response) {
  const usersInputValue = request.body;

  const newUser = await user.create(usersInputValue);
  return response.status(201).json(newUser);
}
