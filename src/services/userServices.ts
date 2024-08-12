import { usersRepo } from "../database"
import { User } from "../database/entity/User";
const bcrypt = require('bcrypt')


export const createNewUser = async (email: string, password: string): Promise<User> => {
  const newUser = new User();
  newUser.email = email;
  newUser.avatar = '';
  newUser.name = '';
  newUser.password = await bcrypt.hash(password, 3);
  const savedUser =  await usersRepo.save(newUser);
  delete savedUser.password
  return savedUser;
}