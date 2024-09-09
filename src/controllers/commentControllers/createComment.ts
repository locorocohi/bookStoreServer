import type { RequestHandler } from "express";
import asyncHandler = require("express-async-handler");
import { createNewComment } from "../../services/commentServices";
import { Comment } from "../../database/entity/Comment";

type CreateCommentHandler = RequestHandler<
  Record<string,unknown>,
  Comment,
  {text: string; bookId: number},
  Record<string, unknown>
>;

export const createComment: CreateCommentHandler = asyncHandler(async (req, res, next) => {
  const { text, bookId } = req.body;
  const accessToken: string = req.get('Authorization');
  const newComment = await createNewComment({text, accessToken, bookId});
  res.json(newComment);
})