import asyncHandler = require("express-async-handler");
import type { RequestHandler } from "express"

import { usersRepo } from "../../database"
import { CustomError } from "../../errors/CustomError";
import errorConstants from "../../errors/errorConstants";
import { writeFile, unlink } from "fs";
import { config } from "../../../config";

export const updateAvatar: RequestHandler = asyncHandler(async (req, res, next) => {
  const { encodedImage, fileType, id } = req.body;
  
  const findedUser = await usersRepo.findOne({where: {id: id}});
  if(!findedUser) {
    throw new CustomError(errorConstants.USER_NOT_EXISTS);
  }

  const imagePayload = encodedImage.split(';base64,')[1];
  const avatarName = `${Date.now()}.${fileType}`;
  const path = `static/${avatarName}`
  
  writeFile(path, imagePayload, {encoding: 'base64'},
    (err) => {
      if (!err) {
        return;
      }
      throw new CustomError(errorConstants.WRONG_MEDIAFILE);
    })
    
  const avatarPath = `http://localhost:${config.PORT}/${avatarName}`;
  const prevAvatarPath = 'static/' + findedUser.avatar.split(config.PORT + '/')[1];
  findedUser.avatar = avatarPath;
  const savedUser =  await usersRepo.save(findedUser);
  delete savedUser.password;
  
  unlink(prevAvatarPath, (err) => {
    if (!err) {
      return;
    }
    // throw new CustomError(errorConstants.GONE);
  });
  
  res.json(savedUser);
});
