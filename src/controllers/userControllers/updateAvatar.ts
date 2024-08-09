import asyncHandler = require("express-async-handler");
import type { RequestHandler } from "express"

import { usersRepo } from "../../database"
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";
import { writeFile } from "fs";
import { config } from "../../../config";

export const updateAvatar: RequestHandler = asyncHandler(async (req, res, next) => {
  const { encodedImage, fileType, id } = req.body;
  
  const imagePayload = encodedImage.split(';base64,')[1];
  const avatarName = `${Date.now()}.${fileType}`;
  const path = `static/${avatarName}`
  
  writeFile( path, imagePayload, {encoding: 'base64'},
    (_err) => {
      if (!_err) {
        return;
      }
      throw new CustomError(errorConstants.WRONG_MEDIAFILE);
    })
    
    const findedUser = await usersRepo.findOne({where: {id: id}});
    if(!findedUser) {
      throw new CustomError(errorConstants.USER_NOT_EXISTS);
    }
    
  const avatarPath = `http://localhost:${config.PORT}/${avatarName}`;
  findedUser.avatar = avatarPath;
  const savedUser =  await usersRepo.save(findedUser);
  delete savedUser.password
  res.json(savedUser)
});
