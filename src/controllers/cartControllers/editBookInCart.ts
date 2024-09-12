import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { findBookById } from "../../services/bookServices";
import { findByToken } from "../../services/userServices";
import { booksToCartRepo } from "../../database";
import { getBooksInCart, getCartTotal } from "../../services/cartServices";

export const editBookInCart = asyncHandler(async (req, res, next) => {
  const {bookId, count} = req.body;
  const accessToken: string = req.get('Authorization');

  const findedUser = await findByToken(accessToken);
  const findedBook = await findBookById(bookId);
  const cart = findedUser.cart;
  const findedBooksInCart = await booksToCartRepo.findOne({
    where: {
      book: findedBook,
      cart,
    },
  })

  if (count === 0) {
    await booksToCartRepo.delete(findedBooksInCart);
  }

  findedBooksInCart.booksCount = count;
  await booksToCartRepo.save(findedBooksInCart);
  
  const updatedBooksInCart = await getBooksInCart(cart)
  const total = getCartTotal(updatedBooksInCart);
  res.json({updatedBooksInCart, total});
});