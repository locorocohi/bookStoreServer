import { usersRepo } from "../../database"
import type { RequestHandler } from "express"
import asyncHandler = require("express-async-handler");

export const deleteUser: RequestHandler = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;
  const deletedUser = await usersRepo.delete(userId);
  res.json(deletedUser).status(204);
})