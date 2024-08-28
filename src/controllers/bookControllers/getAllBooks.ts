import { booksRepo } from "../../database"
import type { RequestHandler } from "express"
import { genres, sortOptions } from "../../services/bookServices";

export const getAllBooks: RequestHandler = async (req, res, next) => {
  console.log(req.query);
  const booksArray = await booksRepo.find({
    order: { 
    id: 'ASC'
  }});
  
  res.status(200).json({ booksArray, sortOptions, genres });
}