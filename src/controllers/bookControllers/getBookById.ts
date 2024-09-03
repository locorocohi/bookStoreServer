import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { booksRepo } from "../../database";
import { Book } from "../../database/entity/Book";

type GetBookHandler = RequestHandler<
  {id: string},
  Book,
  Record<string, unknown>,
  Record<string, unknown>
>;

export const getBookById: GetBookHandler = asyncHandler(async (req, res, next) => {
  const params = req.params;
  const id = Number(params.id)

  const findedBook = await booksRepo.findOne({
    where: {
      id: id,
    }
  })
  
  res.json(findedBook).status(200);
})
