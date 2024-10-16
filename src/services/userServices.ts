import { usersRepo } from "../database"
import { User } from "../database/entity/User";
import { CustomError } from "../errors/CustomError";
import errorConstants from "../errors/errorConstants";
import { verifyTokens } from "./tokenServices";
const bcrypt = require('bcrypt')


export const createNewUser = async (email: string, password: string): Promise<User> => {
  const newUser = new User();
  newUser.email = email;
  newUser.avatar = '';
  newUser.name = '';
  newUser.password = await bcrypt.hash(password, 3);
  const savedUser =  await usersRepo.save(newUser);
  delete savedUser.password;
  return savedUser;
}

export const findByToken = async (token) => {
  const accessToken: string = token.split(' ')[1];
  const decodedPayload = verifyTokens(accessToken)

  const findedUser = await usersRepo.findOne({where: {id: decodedPayload.id}});
    if(!findedUser) {
      throw new CustomError(errorConstants.USER_NOT_EXISTS);
    }

  return findedUser;
}

export const isPassEquals = async (password, findedUser) => {
  const isEquals = await bcrypt.compare(password, findedUser.password);
    if(!isEquals) {
      throw new CustomError(errorConstants.ACCESS_DENIED);
    };
  
  return isEquals;
}