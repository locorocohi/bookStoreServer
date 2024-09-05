import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { createNewComment } from "../../services/commentServices";
import { Comment } from "../../database/entity/Comment";

type CreateCommentHandler = RequestHandler<
  Record<string,unknown>,
  Comment,
  {text: string; userId: number, bookId: number},
  Record<string, unknown>
>;

export const createComment: CreateCommentHandler = asyncHandler(async (req, res, next) => {
  const { text, userId, bookId } = req.body;

  const newComment = await createNewComment(text, userId, bookId);

  res.json(newComment);
})