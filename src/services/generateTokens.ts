import jwt = require('jsonwebtoken')
import { config } from '../../config'

export const generateTokens = (userOptions) => {
  const accessToken = jwt.sign(userOptions, config.SECRET_ACCESS_KEY, { expiresIn: '30m'});
  const refreshToken = jwt.sign(userOptions, config.SECRET_REFRESH_KEY, { expiresIn: '30d'});
  return { accessToken, refreshToken };
}
