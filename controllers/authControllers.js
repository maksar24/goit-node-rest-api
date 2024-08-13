import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { secretKey } from "../constants/authConstants.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

const signup = async (req, res) => {
  const newUser = await authServices.signup(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription ? newUser.subscription : "starter",
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: "24h" });
  await authServices.updateUser({ id }, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: "starter",
    },
  });
};

const logout = async (req, res) => {
  const { id } = req.user;
  await authServices.updateUser({ id }, { token: "" });

  res.status(204).json();
};

const updateUserType = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;

  const user = await authServices.updateUser({ id }, { subscription });

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  updateUserType: ctrlWrapper(updateUserType),
};
