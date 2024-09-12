import { booksToCartRepo, cartRepo } from "../database";
import { BooksToCart } from "../database/entity/BooksToCart"

export const createBooksToCart = async ({cart, book, count}) => {
  const booksToCart = new BooksToCart();
  booksToCart.book = book;
  booksToCart.booksCount = count;
  cart.total += (booksToCart.booksCount * booksToCart.book.price);
  const savedCart = await cartRepo.save(cart);
  booksToCart.cart = savedCart;
  const savedBooksToCart = await booksToCartRepo.save(booksToCart);
  return savedBooksToCart;
};
