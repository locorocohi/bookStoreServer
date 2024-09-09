import { booksRepo, commentsRepo, usersRepo } from "../database";
import { Comment } from "../database/entity/Comment"
import { CustomError } from "../errors/CustomError";
import errorConstants from "../errors/errorConstants";
import { findByToken } from "./userServices";

export const createNewComment = async ({text, accessToken, bookId}) => {
  const findedUser = await findByToken(accessToken);

  const findedBook = await booksRepo.findOne({where: {id: bookId}});
  if(!findedBook) {
    throw new CustomError(errorConstants.BOOK_NOT_EXISTS);
  }

  const newComment = new Comment();
  newComment.text = text;
  newComment.creationTime = 'recently';
  newComment.author = findedUser;
  newComment.book = findedBook;

  const savedComment = await commentsRepo.save(newComment);
  return savedComment;
};
