import { booksRepo } from "../../database";
import type { RequestHandler } from "express";
import { genres, ITEMS_PER_PAGE, sortOptions } from "../../services/bookServices";
import { Book } from "../../database/entity/Book";

type FiltersType = {
  genre?: string;
  sort?: string;
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

type BooksRequestHandler = RequestHandler<
  Record<string, unknown>,
  ResponseType,
  Record<string, unknown>,
  FiltersType
>;

export const getBooks: BooksRequestHandler = async (req, res, next) => {
  const { genre, sort, minPrice, maxPrice, page } = req.query;
  const queryKeys = Object.keys(req.query);
  const isExistParams = !queryKeys.length || (queryKeys.length === 1 && "page" in req.query);
  const skip = page && typeof page === 'string' ? ITEMS_PER_PAGE * (parseInt(page) - 1) : 0;

  const booksArray = booksRepo.createQueryBuilder("book");
  if (isExistParams) {
    const [result, count] = await booksArray
      .skip(skip)
      .take(ITEMS_PER_PAGE)
      .getManyAndCount();
    const pageCount = Math.ceil(count / ITEMS_PER_PAGE);

    res
      .status(200)
      .json({ booksArray: result, pageCount, sortOptions, genres });
    return;
  }

  if (genre) {
    const genresList = genre.split(",");
    booksArray.andWhere("book.genre IN (:...genres)", { genres: genresList });
  }

  if (minPrice) {
    booksArray.andWhere("book.price >= :minPrice", { minPrice });
  }
  if (maxPrice) {
    booksArray.andWhere("book.price <= :maxPrice", { maxPrice });
  }
  if (sort) {
    booksArray.orderBy(`book.${sort}`, "ASC");
  }

  const [result, count] = await booksArray
    .skip(skip)
    .take(ITEMS_PER_PAGE)
    .getManyAndCount();

  const pageCount = Math.ceil(count / ITEMS_PER_PAGE);
  res.status(200).json({ booksArray: result, pageCount, sortOptions, genres });
};
