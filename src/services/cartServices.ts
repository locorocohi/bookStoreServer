import { cartRepo, usersRepo } from "../database";
import { Cart } from "../database/entity/Cart"

export const createCart = async (options: {user}) => {
  const newCart = new Cart();
  newCart.total = 0;
  
  const savedCart = await cartRepo.save(newCart);

  return savedCart;
}