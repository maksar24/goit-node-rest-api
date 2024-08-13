import { Router } from "express";

import validateBody from "../helpers/validateBody.js";
import {
  authLoginSchema,
  authSignupSchema,
  authUserTypeSchema,
} from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authSignupSchema),
  authControllers.signup
);

authRouter.post("/login", validateBody(authLoginSchema), authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(authUserTypeSchema),
  authControllers.updateUserType
);

export default authRouter;
