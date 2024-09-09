import { usersRepo } from "../../database"
import type { RequestHandler } from "express"
import { User } from "../../database/entity/User";

type GetUsersHandler = RequestHandler<
  Record<string, unknown>,
  User[],
  any,
  Record<string, any>
>;

export const getAllUsers: GetUsersHandler = async (req, res, next) => {
  const usersArray = await usersRepo.find({
    order: { 
    id: 'ASC'
  }});
  // const deleted = await usersRepo.clear();

  res.status(200).json(usersArray);
}
