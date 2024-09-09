const express = require('express');
import users from './usersRouter';
import books from './booksRouter';
import comments from './commentsRouter';
import cart from './cartRouter';

const mainRouter = express.Router();

mainRouter.use('/user', users);
mainRouter.use('/book', books);
mainRouter.use('/comment', comments);
mainRouter.use('/cart', cart);

export default mainRouter;
