import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { findByToken } from "../../services/userServices";
import { booksToCartRepo } from "../../database";

export const getBooksFromCart = asyncHandler (async (req, res, next) => {
  const accessToken: string = req.get('Authorization');
  const findedUser = await findByToken(accessToken);
  const cart = findedUser.cart;

  const findedBooksToCart = await booksToCartRepo.find({
    where: {cart},
    relations: {book: true},
  })
  res.json(findedBooksToCart).status(200);
});
