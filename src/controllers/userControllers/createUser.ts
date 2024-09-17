import asyncHandler = require("express-async-handler");

import { usersRepo } from "../../database";
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";
import { generateTokens } from "../../services/tokenServices";
import { createNewUser } from "../../services/userServices";

import type { RequestHandler } from "express";
import { User } from "../../database/entity/User";

type CreateUserHandler = RequestHandler<
  Record<string,unknown>,
  {user: User; accessToken: string},
  {email: string; password: string},
  Record<string, unknown>
>;

export const createUser: CreateUserHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const findedUser = await usersRepo.findOne({where: {email: email}});
  if(findedUser) {
    throw new CustomError(errorConstants.USER_EXISTS);
  }
  
  const user = await createNewUser(email, password);
  const accessToken = generateTokens({id: user.id});

  res.cookie('accessToken', accessToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
  res.json({user, accessToken});
})
