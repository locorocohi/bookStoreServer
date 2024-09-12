import { booksToCartRepo, cartRepo, usersRepo } from "../database";
import { BooksToCart } from "../database/entity/BooksToCart";
import { Cart } from "../database/entity/Cart"

export const createCart = async (options: {user}) => {
  const newCart = new Cart();
  newCart.total = 0;
  
  const savedCart = await cartRepo.save(newCart);

  return savedCart;
}

export const getCartTotal = (booksToCart) => {
  const result = booksToCart.reduce((acc, elem) => {
    acc += elem.booksCount * elem.book.price;
    return acc;
  }, 0);

  return result;
}

export const getBooksInCart = async (cart: Cart) => {
  const findedBooksToCart = await booksToCartRepo.find({
    where: {cart},
    relations: {book: true},
  });
  
  if(!findedBooksToCart) {
    return []
  }

  return findedBooksToCart;
}