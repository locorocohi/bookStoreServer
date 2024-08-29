import { booksRepo } from "../../database"
import type { RequestHandler } from "express"
import { genres, sortOptions } from "../../services/bookServices";
import { Book } from "../../database/entity/Book";

type FiltersType = {
  genre?: string; 
  sortOption?: string;
  minPrice?: string;
  maxPrice?: string;
}

type ResponseType = {
  booksArray: Book[],
  sortOptions: string[],
  genres: string[];
}

type BooksGetter = RequestHandler<Record<string, unknown>, ResponseType, Record<string, unknown>, FiltersType>;

export const getBooks: BooksGetter = async (req, res, next) => { // params , res.body, req.body
  
  const { genre, sortOption, minPrice, maxPrice } = req.query;

  if (!genre && !sortOption && !minPrice && !maxPrice) {
    const result = await booksRepo.find({
      order: { 
      id: 'ASC'
    }});
    res.status(200).json({ booksArray: result, sortOptions, genres });
    return;
  }

  const booksArray = booksRepo.createQueryBuilder("book");
  const genresList = genre ? genre.split(',') : [];
    if (genresList.length) {
      booksArray.where("book.genre IN (:...genres)", {genres: genresList});
    };
    if (minPrice) {
      booksArray.where("book.price >= :price", { price: minPrice });
    };
    if (maxPrice) {
      booksArray.where("book.price <= :price", { price: maxPrice });
    };
    if (sortOption) {
      booksArray.orderBy(`book.${sortOption}`, "ASC");
    };
    const result = await booksArray.getMany()
  res.status(200).json({ booksArray: result, sortOptions, genres });
}
