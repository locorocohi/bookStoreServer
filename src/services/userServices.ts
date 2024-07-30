import { usersRepo } from "../database"
import { User } from "../database/entity/User";
import { CustomError } from "../errors/CustomError";
import errorConstants from "../errors/errorConstants";


export const registration = async (email: string, password: string) => {
  const candidate = await usersRepo.findOne({where: {email: email}})
  if(candidate) {
    throw new CustomError(errorConstants.USER_EXISTS);
  }
  const newUser = new User();
  newUser.email = email;
  newUser.password = password;

  const savedUser =  await usersRepo.save(newUser);
  return savedUser.id;
}