import asyncHandler = require("express-async-handler");
import { usersRepo } from "../../database";
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";
import { generateTokens } from "../../services/tokenServices";
const bcrypt = require('bcrypt')

import type { RequestHandler } from "express"
import { User } from "../../database/entity/User";

type LoginReqHandler = RequestHandler<
  Record<string,unknown>,
  {findedUser: User; accessToken: string},
  {email: string; password: string},
  Record<string, unknown>
>;

export const login: LoginReqHandler = asyncHandler(async(req, res, next) => {
  const { email, password } = req.body;

  const findedUser = await usersRepo.findOne({where: {email: email}});
  if(!findedUser) {
    throw new CustomError(errorConstants.USER_NOT_EXISTS);
  }

  const isPassEquals = await bcrypt.compare(password, findedUser.password);
  if(!isPassEquals) {
    throw new CustomError(errorConstants.ACCESS_DENIED);
  };

  delete findedUser.password;
  const accessToken = generateTokens({id: findedUser.id});

  res.cookie('accessToken', accessToken, {maxAge: 3 * 60 * 1000, httpOnly: true});
  res.json({findedUser, accessToken});
});
