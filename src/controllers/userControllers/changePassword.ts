import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { usersRepo } from "../../database";
import { findByToken, isPassEquals } from "../../services/userServices";
const bcrypt = require('bcrypt');

export const changePassword: RequestHandler = asyncHandler(async (req, res, next) => {
  const accessToken: string = req.get('Authorization');
  const { password, secondPassword } = req.body;
  
  const findedUser = await findByToken(accessToken);
  const isEquals = await isPassEquals(password, findedUser);

  if(isEquals) {
    findedUser.password = await bcrypt.hash(secondPassword, 3);
  }

  const savedUser =  await usersRepo.save(findedUser);
  delete savedUser.password;
  res.json(savedUser);
});
