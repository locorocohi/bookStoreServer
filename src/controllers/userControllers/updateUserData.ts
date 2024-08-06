import asyncHandler = require("express-async-handler");
import type { RequestHandler } from "express"

import { usersRepo } from "../../database"

export const updateUserData: RequestHandler = asyncHandler(async (req, res, next) => {
  
});