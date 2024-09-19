import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { usersRepo } from "../../database";
import { findByToken, isPassEquals } from "../../services/userServices";
import { User } from "../../database/entity/User";
const bcrypt = require('bcrypt');

type Keys = 'password' | 'secondPassword';
type ReqBodyType = Record<Keys, string>;

type ChangePassRequestHandler = RequestHandler<
  Record<string,unknown>,
  User,
  ReqBodyType,
  Record<string, unknown>
>;

export const changePassword: ChangePassRequestHandler = asyncHandler(async (req, res, next) => {
  const accessToken: string = req.get('Authorization');
  const { password, secondPassword } = req.body;

  const findedUser = await findByToken(accessToken);
  await isPassEquals(password, findedUser);
  
  findedUser.password = await bcrypt.hash(secondPassword, 3);
  const savedUser =  await usersRepo.save(findedUser);
  delete savedUser.password;
  res.json(savedUser);
});
