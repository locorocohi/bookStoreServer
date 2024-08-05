import { usersRepo } from "../../database";
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";
import { generateTokens } from "../../services/tokenServices";
import { createNewUser } from "../../services/userServices";
import asyncHandler = require("express-async-handler");

import type { RequestHandler } from "express";

export const createUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body as {email: string, password: string};

  const findedUser = await usersRepo.findOne({where: {email: email}});
  if(findedUser) {
    throw new CustomError(errorConstants.USER_EXISTS);
  }

  const user = await createNewUser(email, password);
  const accessToken = generateTokens({id: user.id});

  res.cookie('accessToken', accessToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
  res.json({user, accessToken});
})
