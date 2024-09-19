import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { createBooksToCart } from "../../services/booksToCartServices";
import { findByToken } from "../../services/userServices";
import { BooksToCart } from "../../database/entity/BooksToCart";
import { findBookById } from "../../services/bookServices";
import { booksToCartRepo } from "../../database";
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";

type AddBookRequestHendler = RequestHandler<
  unknown,
  BooksToCart,
  {bookId: number},
  unknown
>;

export const addBookInCart: AddBookRequestHendler = asyncHandler(async (req, res, next) => {
  const {bookId} = req.body;
  const accessToken: string = req.get('Authorization');
  
  if(!accessToken) {
    throw new CustomError(errorConstants.UNAUTHORIZED)
  };

  const findedUser = await findByToken(accessToken);
  const cart = findedUser.cart;
  const findedBook = await findBookById(bookId);
  const findedBooksInCart = await booksToCartRepo.findOne({
    where: {
      book: findedBook,
      cart,
    },
  })

  if (!findedBooksInCart) {
    const booksToCart = await createBooksToCart({cart, book: findedBook});
    res.json(booksToCart);
  }

  findedBooksInCart.booksCount += 1; 
  const savedbookInCart = await booksToCartRepo.save(findedBooksInCart);
  res.json(savedbookInCart);
});
