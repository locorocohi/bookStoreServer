import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");

export const addBookInCart: RequestHandler = asyncHandler(async (req, res, next) => {
  const accessToken: string = req.get('Authorization');
  // const addedBook = await
  // res.json(addedBook);
});
