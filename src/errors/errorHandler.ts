import { CustomError } from "./CustomError"

export default (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ 
      status: err.statusCode, 
      message: err.message,
    });
  };
  res.status(500).json({
    name: err.name, 
    message: err.message,
    // stack: err.stack,
  });
};
