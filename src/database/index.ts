import { AppDataSource } from "./data-source";
import { Book } from "./entity/Book";
import { BooksToCart } from "./entity/BooksToCart";
import { Cart } from "./entity/Cart";
import { Comment } from "./entity/Comment";
import { User } from "./entity/User";

export const usersRepo = AppDataSource.getRepository(User);
export const booksRepo = AppDataSource.getRepository(Book);
export const commentsRepo = AppDataSource.getRepository(Comment);
export const cartRepo = AppDataSource.getRepository(Cart);
export const booksToCartRepo = AppDataSource.getRepository(BooksToCart);