import asyncHandler = require("express-async-handler");

import type { RequestHandler } from "express"
import { findByToken } from "../../services/userServices";

export const getMe: RequestHandler = asyncHandler(async(req, res, next) => {
  const accessToken: string = req.get('Authorization');

  const findedUser = await findByToken(accessToken);

  delete findedUser.password;
  res.json(findedUser)
});
