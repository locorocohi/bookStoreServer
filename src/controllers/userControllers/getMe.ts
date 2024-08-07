import asyncHandler = require("express-async-handler");
import { verifyTokens } from "../../services/tokenServices";
import { usersRepo } from "../../database";
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";

import type { RequestHandler } from "express"

export const getMe: RequestHandler = asyncHandler(async(req, res, next) => {
  const accessToken: string = req.get('Authorization').split(' ')[1];
  const decodedPayload = verifyTokens(accessToken)

  const findedUser = await usersRepo.findOne({where: {id: decodedPayload.id}});

  if(!findedUser) {
    throw new CustomError(errorConstants.USER_NOT_EXISTS);
  }

  delete findedUser.password;
  res.json(findedUser)
});
