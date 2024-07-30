import jwt = require('jsonwebtoken')
import { config } from '../../config'

export const generateTokens = (userOptions: {id: number}): string => {
  const accessToken = jwt.sign(userOptions, config.SECRET_ACCESS_KEY, { expiresIn: '30m'});
  return accessToken;
}
