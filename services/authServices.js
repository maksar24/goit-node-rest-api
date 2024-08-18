import bcrypt from "bcrypt";
import gravatar from "gravatar";

import User from "../db/models/User.js";

const findUser = (query) =>
  User.findOne({
    where: query,
  });

const updateUser = async (query, data) => {
  const user = await findUser(query);
  if (!user) {
    return null;
  }
  return user.update(data, {
    returning: true,
  });
};

const signup = async (data) => {
  try {
    const { email, password } = data;
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mp",
    });
    const newUser = await User.create({
      ...data,
      password: hashPassword,
      avatarURL,
    });
    return newUser;
  } catch (error) {
    if (error?.parent?.code === "23505") {
      error.message = "Email already exists";
    }
    throw error;
  }
};

export default {
  findUser,
  updateUser,
  signup,
};
