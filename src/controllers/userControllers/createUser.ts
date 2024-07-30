import { usersRepo } from "../../database";
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";
import { generateTokens } from "../../services/generateTokens";
import { registration } from "../../services/userServices";
import asyncHandler = require("express-async-handler");

export const createUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const findedUser = await usersRepo.findOne({where: {email: email}})
  if(findedUser) {
    throw new CustomError(errorConstants.USER_EXISTS);
  }

  const user = await registration(email, password)
  const { accessToken } = generateTokens(user)

  res.cookie('accessToken', accessToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
  res.json({user, accessToken});
})
