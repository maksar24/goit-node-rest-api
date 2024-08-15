import Joi from "joi";

import { emailRegexp } from "../constants/authConstants.js";

export const authSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid("starter", "pro", "business").optional(),
});

export const authLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const authUserTypeSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});
