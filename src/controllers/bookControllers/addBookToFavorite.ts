import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { findBookById } from "../../services/bookServices";
import { findByToken } from "../../services/userServices";
import { usersRepo } from "../../database";

export const addBookToFavorite = asyncHandler(async (req, res, next) => {
  const { bookId }  = req.body;
  const accessToken: string = req.get('Authorization');
  
  const findedUser = await findByToken(accessToken);
  const findedBook = await findBookById(bookId);

  findedUser.favorites.push(findedBook);

  const savedUser = await usersRepo.save(findedUser);
  res.status(200).json(savedUser);
});
