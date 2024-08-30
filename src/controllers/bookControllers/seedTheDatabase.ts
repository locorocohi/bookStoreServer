import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { seedTheDatabase } from "../../services/bookServices";
import { booksRepo } from "../../database";

export const seedByBooks: RequestHandler = asyncHandler(async (req, res, next) => {
  const { amount } = req.body;
  const result = await seedTheDatabase(amount);

  // const deleted = await booksRepo.clear();

  res.json(result).status(200);
});
