import jwt = require('jsonwebtoken');
import { config } from '../../config';

export const generateTokens = (user :{ id: number}): string => {
  const accessToken = jwt.sign(user, config.SECRET_ACCESS_KEY, { expiresIn: '1m'});
  return accessToken;
};

export const verifyTokens = (token: string) => {
  const decoded = jwt.verify(token, config.SECRET_ACCESS_KEY) as jwt.JwtPayload;

  return decoded;
};
