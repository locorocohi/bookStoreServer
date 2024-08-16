export default {
  NOT_FOUND: {statusCode: 404, message: 'There is nothing here'},
  BAD_REQUEST: {statusCode: 400, message: 'Required property were not entered'},
  USER_EXISTS: {statusCode: 409, message: 'User with the same Email already exists'},
  USER_NOT_EXISTS: {statusCode: 404, message: 'User with the same Email is not exists'},
  ACCESS_DENIED: {statusCode: 401, message: 'Wrong Email or Password'},
  NOT_VERIFIED_TOKEN: {statusCode: 401, message: 'Token not verified'},
  WRONG_MEDIAFILE: {statusCode: 422, message: 'Some troubles with picture'},
  GONE: {statusCode: 402, message: 'Resource is no longer available on the server and that this condition is likely to be permanent'},
};
