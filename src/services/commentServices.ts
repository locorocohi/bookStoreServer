import { booksRepo, commentsRepo, usersRepo } from "../database";
import { Comment } from "../database/entity/Comment"
import { CustomError } from "../errors/CustomError";
import errorConstants from "../errors/errorConstants";

export const createNewComment = async (text, userId, bookId) => {
  const findedUser = await usersRepo.findOne({where: {id: userId}});
  if(!findedUser) {
    throw new CustomError(errorConstants.USER_NOT_EXISTS);
  }

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
}
