import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { findByToken } from "../../services/userServices";
import { usersRepo } from "../../database";


export const removeFromFavorite = asyncHandler(async (req, res, next) => {
  const { bookId }  = req.body;
  const accessToken: string = req.get('Authorization');
  
  const findedUser = await findByToken(accessToken);

  findedUser.favorites = findedUser.favorites.filter((book) => book.id != bookId)

  const savedUser = await usersRepo.save(findedUser);
  res.status(200).json(savedUser);
});