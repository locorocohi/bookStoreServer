import { CustomError } from "./CustomError"

export default (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      message: err.message,
    });
  } else {
  res.status(500).json({
    name: err.name, 
    message: err.message,
  })
 };
};
