import { usersRepo } from "../../database"

export const getAllUsers = async (req, res, next) => {
  const usersArray = await usersRepo.find({
    order: { 
    id: 'ASC'
  }})

  res.status(200).json(usersArray)
}