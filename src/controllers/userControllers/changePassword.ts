import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { usersRepo } from "../../database";
import { findByToken, isPassEquals } from "../../services/userServices";
const bcrypt = require('bcrypt');

type Keys = 'password' | 'thirdPassword';
type ReqBodyType = Record<Keys, string>;

export const changePassword: RequestHandler<unknown, unknown, ReqBodyType, unknown> = asyncHandler(async (req, res, next) => {
  const accessToken: string = req.get('Authorization');
  const { password, thirdPassword } = req.body;

  const findedUser = await findByToken(accessToken);
  await isPassEquals(password, findedUser);
  
  findedUser.password = await bcrypt.hash(thirdPassword, 3);
  const savedUser =  await usersRepo.save(findedUser);
  delete savedUser.password;
  res.json(savedUser);
});
