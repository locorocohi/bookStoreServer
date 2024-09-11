import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { booksRepo, commentsRepo } from "../../database";
import { Book } from "../../database/entity/Book";
import { Comment } from "../../database/entity/Comment";
import { findBookById } from "../../services/bookServices";

type GetBookHandler = RequestHandler<
  {id: string},
  { findedBook: Book, 
    findedComments: Comment[],
    recommendedBooks: Book[],
  },
  Record<string, unknown>,
  Record<string, unknown>
>;

export const getBookById: GetBookHandler = asyncHandler(async (req, res, next) => {
  const params = req.params;
  const id = Number(params.id)

  const findedBook = await findBookById(id)

  const findedComments = await commentsRepo.find({
    where: {
      book: findedBook,
    },
    relations: {
      author: true,
  },
  })

  const recommendedBooks = await booksRepo.createQueryBuilder('book')
    .orderBy('book.rating', 'DESC')
    .getMany()

  res.json({ findedBook, findedComments, recommendedBooks: recommendedBooks.slice(0, 4) }).status(200);
})
