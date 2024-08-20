import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import "dotenv/config";

import User from "../db/models/User.js";
import sendEmail from "../helpers/sendEmail.js";
const { BASE_URL } = process.env;

const findUser = (query) =>
  User.findOne({
    where: query,
  });

const sendVerifyEmail = (email, verificationToken) => {
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`,
  };

  return sendEmail(verifyEmail);
};

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
    const verificationToken = nanoid();
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
      verificationToken,
    });
    await sendVerifyEmail(email, verificationToken);
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
  sendVerifyEmail,
  updateUser,
  signup,
};
