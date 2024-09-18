import { addBookToFavorite } from "./addBookToFavorite";
import { getBookById } from "./getBookById";
import { getBooks } from "./getBooks";
import { removeFromFavorite } from "./removeFromFavorite";
import { seedByBooks } from "./seedTheDatabase";
import { updateBookRating } from "./updateBookRating";

export default {
  seedByBooks,
  getBooks,
  getBookById,
  updateBookRating,
  addBookToFavorite,
  removeFromFavorite,
};
