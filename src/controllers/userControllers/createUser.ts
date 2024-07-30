import { generateTokens } from "../../services/generateTokens";
import { registration } from "../../services/userServices";
import asyncHandler = require("express-async-handler");

export const createUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const createdUserId = await registration(email, password)
  const { accessToken } = generateTokens({createdUserId})

  res.cookie('accessToken', accessToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
  res.json(createdUserId);
})
