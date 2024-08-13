import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { usersRepo } from "../../database";
import { findByToken } from "../../services/userServices";

export const changeInfo: RequestHandler = asyncHandler(async (req, res, next) => {
  
  const { name, email } = req.body;
  const accessToken: string = req.get('Authorization');
  
  const findedUser = await findByToken(accessToken)

  findedUser.email = email;
  findedUser.name = name;
  const savedUser =  await usersRepo.save(findedUser);
  delete savedUser.password
  res.json(savedUser)
})