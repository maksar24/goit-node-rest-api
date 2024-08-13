import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";
import authServices from "../services/authServices.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(HttpError(401, "Authorization header missing"));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer missing"));
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await authServices.findUser({ id });
    if (!user) {
      return next(HttpError(401, "Not authorized"));
    }

    if (!user.token || user.token !== token) {
      return next(HttpError(401, "Not authorized"));
    }

    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
