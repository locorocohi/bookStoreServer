import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { booksRepo, commentsRepo } from "../../database";

export const getComments = asyncHandler(async (req, res, next) => {
  const params = req.params;
  const bookId = Number(params.id)

  const findedBook = await booksRepo.findOne({
    where: {
      id: bookId,
    }
  })

  const findedComments = await commentsRepo.find({
    where: {
      book: findedBook,
    }
  })
  
  console.log(findedComments)
  res.json(findedComments).status(200);
})