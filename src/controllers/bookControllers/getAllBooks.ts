import { booksRepo } from "../../database"
import type { RequestHandler } from "express"

export const getAllBooks: RequestHandler = async (req, res, next) => {
  const booksArray = await booksRepo.find({
    order: { 
    id: 'ASC'
  }});
  // const deleted = await books.clear();

  res.status(200).json(booksArray);
}