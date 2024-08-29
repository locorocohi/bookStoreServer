import { booksRepo } from "../../database"
import type { RequestHandler } from "express"
import { genres, sortOptions } from "../../services/bookServices";

export const getAllBooks: RequestHandler = async (req, res, next) => {
  const { genre, sortOption, minPrice, maxPrice } = req.query;
  console.log(genre, sortOption, minPrice, maxPrice)
  const booksArray = await booksRepo.find({
    order: { 
    id: 'ASC'
  }});
  
  // const booksArray = await booksRepo
  //   .createQueryBuilder("book")
  //   .where("book.name= :name", {name: "req.name"})
  //   .andWhere("book.author= :author", {author: "req.author"})
  //   .andWhere("book.genre IN (:...genres)", {genres: [...req.genres]})
  //   .andWhere("book.price= :price")

  res.status(200).json({ booksArray, sortOptions, genres });
}
