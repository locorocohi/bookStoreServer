import { booksRepo } from "../../database";
import type { RequestHandler } from "express";
import { genres, sortOptions } from "../../services/bookServices";
import { Book } from "../../database/entity/Book";

type FiltersType = {
  genre?: string;
  sortOption?: string;
  minPrice?: string;
  maxPrice?: string;
  page?: string;
};

type ResponseType = {
  booksArray: Book[];
  sortOptions: string[];
  genres: string[];
  pageCount: number;
};

type BooksGetter = RequestHandler<
  Record<string, unknown>,
  ResponseType,
  Record<string, unknown>,
  FiltersType
>;

export const getBooks: BooksGetter = async (req, res, next) => {
  const { genre, sortOption, minPrice, maxPrice, page } = req.query;

  const queryKeys = Object.keys(req.query);
  const isExistAnotherValues =
    !queryKeys.length || (queryKeys.length === 1 && "page" in req.query);

  const take = 12;
  const skip = typeof parseInt(page) === "number" ? take * parseInt(page) : 0;

  const booksArray = booksRepo.createQueryBuilder("book");
  if (isExistAnotherValues) {
    const [result, count] = await booksArray
      .skip(skip)
      .take(take)
      .getManyAndCount();
    const pageCount = Math.ceil(count / take);

    res
      .status(200)
      .json({ booksArray: result, pageCount, sortOptions, genres });
    return;
  }

  const genresList = genre ? genre.split(",") : [];
  if (genresList.length > 0) {
    booksArray.where("book.genre IN (:...genres)", { genres: genresList });
  }
  if (minPrice) {
    booksArray.where("book.price >= :price", { price: minPrice });
  }
  if (maxPrice) {
    booksArray.where("book.price <= :price", { price: maxPrice });
  }
  if (sortOption) {
    booksArray.orderBy(`book.${sortOption}`, "ASC");
  }

  const [result, count] = await booksArray
    .skip(skip)
    .take(take)
    .getManyAndCount();
  const pageCount = Math.ceil(count / take);
  res.status(200).json({ booksArray: result, pageCount, sortOptions, genres });
};
