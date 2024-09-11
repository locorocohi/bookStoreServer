import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { createBooksToCart } from "../../services/booksToCartServices";
import { findByToken } from "../../services/userServices";
import { BooksToCart } from "../../database/entity/BooksToCart";
import { findBookById } from "../../services/bookServices";

type AddBookRequestHendler = RequestHandler<
  unknown,
  BooksToCart,
  {bookId: number, count: number},
  unknown
>;

export const addBookInCart: AddBookRequestHendler = asyncHandler(async (req, res, next) => {
  const {bookId, count} = req.body;
  const accessToken: string = req.get('Authorization');
  const findedUser = await findByToken(accessToken);
  const cart = findedUser.cart;
  const findedBook = await findBookById(bookId);
  const booksToCart = await createBooksToCart({cart, book: findedBook, count});
  res.json(booksToCart);
});
