const express = require('express');
import users from './usersRouter';
import books from './booksRouter';
import comments from './commentsRouter'
const mainRouter = express.Router();

mainRouter.use('/user', users);
mainRouter.use('/book', books);
mainRouter.use('/comment', comments)

export default mainRouter;
