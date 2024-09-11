import { booksToCartRepo } from "../database";
import { BooksToCart } from "../database/entity/BooksToCart"

export const createBooksToCart = async ({cart, book, count}) => {
  const booksToCart = new BooksToCart();
  booksToCart.book = book;
  booksToCart.cart = cart;
  booksToCart.booksCount = count;

  const savedBooksToCart = await booksToCartRepo.save(booksToCart);
  return savedBooksToCart;
};
