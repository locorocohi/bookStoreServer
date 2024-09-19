import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { usersRepo } from "../../database";
import { findByToken } from "../../services/userServices";
import { User } from "../../database/entity/User";

type ChangeInfoRequestHandler = RequestHandler<
  Record<string, unknown>,
  User,
  {name: string},
  Record<string, unknown>
>;
export const changeInfo: ChangeInfoRequestHandler = asyncHandler(async (req, res, next) => {
  
  const { name } = req.body;
  const accessToken: string = req.get('Authorization');
  
  const findedUser = await findByToken(accessToken)

  findedUser.name = name;
  const savedUser =  await usersRepo.save(findedUser);
  delete savedUser.password
  res.json(savedUser)
})