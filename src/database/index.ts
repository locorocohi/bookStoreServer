import { AppDataSource } from "./data-source";
import { Book } from "./entity/Book";
import { Comment } from "./entity/Comment";
import { User } from "./entity/User";

export const usersRepo = AppDataSource.getRepository(User);
export const booksRepo = AppDataSource.getRepository(Book);
export const commentsRepo = AppDataSource.getRepository(Comment);