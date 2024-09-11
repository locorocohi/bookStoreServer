import { config } from "../../config";
import { booksRepo } from "../database";
import { Book } from "../database/entity/Book";

export const bookNames = [
  'The Chronicles of Narnia',
  'The Psychlogy of Money',
  'The Picture of Dorian Gray',
  'The Subtle art of not giving a fuck',
  'The Two towers',
  'Book of Fairy Tales',
  'How to stop worrying and start living',
  'Don’t sweat the Small Stuff',
  'The Weight of Things',
  'milk and honey',
  'Moby Dick',
  'The Crying book',
];

export const authors = [
  'C. S. Lewis',
  'Morgan Housel',
  'Oscar Wilde',
  'Mark Manson',
  'J. R. R. Tolkien',
  'Angela Carter',
  'Dale Carnegie',
  'Richard Carlson',
  'Marianne Flitz',
  'Rupi Kaur',
  'Herman Melville',
  'Heather Christle',
];

export const genres = [
  'Fiction', 
  'Non-fiction', 
  'Science', 
  'Fasion', 
  'History', 
  'Horror'
];

export const sortOptions = [
  'Price', 
  'Name', 
  'Author', 
  'Rating', 
  'Date of issue'
];

export const description = [ 'Rupi Kaur is the Writer of the Decade.” - The New Republic. \n#1 New York Times bestseller milk and honey is a collection of poetry and prose about survival. About the experience of violence, abuse, love, loss, and femininity.\nThe book is divided into four chapters, and each chapter serves a different purpose. Deals with a different pain. Heals a different heartache. milk and honey takes readers through a journey of the most bitter moments in life and finds sweetness in them because there is sweetness everywhere if you are just willing to look.'];

export const ITEMS_PER_PAGE = 12;

const getRandomInteger = (min, max) => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const seedTheDatabase = async (amount: number) => {
  const result = [];
  
  for(let i = 1; i <= amount; i++) {
    const randonAuthor = authors[getRandomInteger(1, 11)];
    const randomName = bookNames[getRandomInteger(1, 11)];
    const randomGenre = genres[getRandomInteger(1, 5)];
    const randomRating = getRandomInteger(1, 4);
    const randomPrice = getRandomInteger(0, 100) - 0.01;
    const randonCover = `http://localhost:${config.PORT}/covers/${getRandomInteger(1, 11)}.svg`;

    const newBook = new Book();
    newBook.cover = randonCover;
    newBook.author = randonAuthor;
    newBook.name = randomName;
    newBook.genre = randomGenre;
    newBook.rating = randomRating;
    newBook.price = randomPrice;
    newBook.available = true;
    newBook.description = description[0];

    const savedBook =  await booksRepo.save(newBook);
    result.push(savedBook)
  }

  return result;
}

export const findBookById = async (id: number) => {
  const findedBook = await booksRepo.findOne({
    where: {
      id: id,
    }
  });

  return findedBook;
};