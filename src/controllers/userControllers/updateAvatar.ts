import asyncHandler = require("express-async-handler");
import type { RequestHandler } from "express"

import { usersRepo } from "../../database"
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";

export const updateAvatar: RequestHandler = asyncHandler(async (req, res, next) => {
  const { image, id } = req.body;
  console.log(image, id)
  const findedUser = await usersRepo.findOne({where: {id: id}});

  if(!findedUser) {
    throw new CustomError(errorConstants.USER_NOT_EXISTS);
  }

  findedUser.avatar = image;
  delete findedUser.password
  res.json(findedUser)
});