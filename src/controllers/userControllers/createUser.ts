import { usersRepo } from "../../database"
import { User } from "../../database/entity/User"
import { generateTokens } from "../../services/generateTokens";

export const createUser = async (req, res, next) => {
  const { email, password } = req.body
  const { accessToken , refreshToken } = generateTokens({email, password})

  const newUser = new User();
  newUser.email = email;
  newUser.password = password;
  newUser.accessToken = accessToken;

  const savedUser =  await usersRepo.save(newUser);
  res.cookie('refreshToken', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

  res.json(savedUser);
}