import { usersRepo } from "../../database"
import { User } from "../../database/entity/User"

export const createUser = async (req, res, next) => {
  const newUser = new User();
  newUser.login = req.body.login;
  newUser.password = req.body.password;
  const savedUser =  await usersRepo.save(newUser);

  res.status(200).json(savedUser);
}