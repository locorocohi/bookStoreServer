import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { findByToken } from "../../services/userServices";
import { booksToCartRepo } from "../../database";
import { getBooksInCart, getCartTotal } from "../../services/cartServices";

export const getBooksFromCart = asyncHandler (async (req, res, next) => {
  const accessToken: string = req.get('Authorization');
  const findedUser = await findByToken(accessToken);
  const cart = findedUser.cart;
  const findedBooksToCart = await getBooksInCart(cart);

  const total = getCartTotal(findedBooksToCart);

  res.json({booksInCart: findedBooksToCart, total}).status(200);
});
