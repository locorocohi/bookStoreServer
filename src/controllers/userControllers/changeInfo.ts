import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { usersRepo } from "../../database";
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";
import { verifyTokens } from "../../services/tokenServices";

export const changeInfo: RequestHandler = asyncHandler(async (req, res, next) => {
  const accessToken: string = req.get('Authorization').split(' ')[1];
  const decodedPayload = verifyTokens(accessToken)

  const { name, email } = req.body;

  const findedUser = await usersRepo.findOne({where: {id: decodedPayload.id}});
    if(!findedUser) {
      throw new CustomError(errorConstants.USER_NOT_EXISTS);
    }

  findedUser.email = email;
  findedUser.name = name;
  const savedUser =  await usersRepo.save(findedUser);
  delete savedUser.password
  res.json(savedUser)
})