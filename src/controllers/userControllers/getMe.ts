import asyncHandler = require("express-async-handler");

import type { RequestHandler } from "express"
import { findByToken } from "../../services/userServices";
import { User } from "../../database/entity/User";
import { getBooksInCart } from "../../services/cartServices";

type GetMeHandler = RequestHandler<
  Record<string, unknown>,
  {findedUser: User, booksInCartCount: number},
  any,
  Record<string, any>
>;

export const getMe: GetMeHandler = asyncHandler(async(req, res, next) => {
  const accessToken: string = req.get('Authorization');

  const findedUser = await findByToken(accessToken);
  const findedBooks = await getBooksInCart(findedUser.cart);
  const booksInCartCount = findedBooks.length;
  delete findedUser.password;
  res.json({findedUser, booksInCartCount})
});
