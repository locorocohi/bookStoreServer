import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { booksRepo, commentsRepo } from "../../database";
import { Book } from "../../database/entity/Book";
import { Comment } from "../../database/entity/Comment";

type GetBookHandler = RequestHandler<
  {id: string},
  { findedBook: Book, findedComments: Comment[] },
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

  const findedComments = await commentsRepo.find({
    where: {
      book: findedBook,
    }
  })
  
  res.json({ findedBook, findedComments }).status(200);
})
