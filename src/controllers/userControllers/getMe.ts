import asyncHandler = require("express-async-handler");

import type { RequestHandler } from "express"
import { findByToken } from "../../services/userServices";
import { User } from "../../database/entity/User";

type GetMeHandler = RequestHandler<
  Record<string, unknown>,
  User,
  any,
  Record<string, any>
>;

export const getMe: GetMeHandler = asyncHandler(async(req, res, next) => {
  const accessToken: string = req.get('Authorization');

  const findedUser = await findByToken(accessToken);

  delete findedUser.password;
  res.json(findedUser)
});
