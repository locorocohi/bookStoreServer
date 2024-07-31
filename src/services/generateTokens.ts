import jwt = require('jsonwebtoken')
import { config } from '../../config'

export const generateTokens = (user :{email: string, id: number}): string => {
  const accessToken = jwt.sign(user, config.SECRET_ACCESS_KEY, { expiresIn: '30m'});
  return accessToken;
}
