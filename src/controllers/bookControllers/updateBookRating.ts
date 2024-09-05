import { booksRepo } from "../../database";
import type { RequestHandler } from "express";
import { Book } from "../../database/entity/Book";
import asyncHandler = require("express-async-handler");

type UpdateRequestHandler = RequestHandler<
{id: string},
number,
{ rating: number },
unknown
>;

export const updateBookRating:UpdateRequestHandler = asyncHandler(async (req, res, next) => {
  const params = req.params;
  const { rating } = req.body;
  const id = Number(params.id)

  const findedBook = await booksRepo.findOne({
    where: {
      id: id,
    }
  })

  findedBook.rating = (findedBook.rating + rating) / 2;
  const savedBook = await booksRepo.save(findedBook);
  res.json(savedBook.rating).status(200);
});
