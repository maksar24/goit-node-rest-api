import { Router } from "express";

import validateBody from "../helpers/validateBody.js";
import {
  authLoginSchema,
  authSignupSchema,
  authUserTypeSchema,
} from "../schemas/authSchemas.js";
import authControllers from "../controllers/authControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authSignupSchema),
  authControllers.signup
);

authRouter.post("/login", validateBody(authLoginSchema), authControllers.login);

authRouter.post("/logout", authenticate, authControllers.logout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(authUserTypeSchema),
  authControllers.updateUserType
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateUserAvatar
);

export default authRouter;
