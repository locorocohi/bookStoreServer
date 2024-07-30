import { usersRepo } from "../../database"
import { User } from "../../database/entity/User"

export const getAllUsers = async (req, res, next) => {
  const usersArray = await usersRepo.find({
    order: { 
    id: 'ASC'
  }})
  // const deleted = await usersRepo.clear()

  res.status(200).json(usersArray)
}
