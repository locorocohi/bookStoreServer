import { AppDataSource } from "./data-source";
import { Book } from "./entity/Book";
import { User } from "./entity/User";

export const usersRepo = AppDataSource.getRepository(User);
export const booksRepo = AppDataSource.getRepository(Book);