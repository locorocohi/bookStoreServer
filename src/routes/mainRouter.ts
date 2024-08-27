const express = require('express');
import users from './usersRouter';
import books from './booksRouter';
const mainRouter = express.Router();

mainRouter.use('/user', users);
mainRouter.use('/book', books)

export default mainRouter;
