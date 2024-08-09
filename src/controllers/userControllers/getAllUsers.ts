import { usersRepo } from "../../database"
import type { RequestHandler } from "express"

export const getAllUsers: RequestHandler = async (req, res, next) => {
  const usersArray = await usersRepo.find({
    order: { 
    id: 'ASC'
  }});
  const deleted = await usersRepo.clear();

  res.status(200).json(usersArray);
}
