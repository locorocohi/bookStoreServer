const express = require('express');
import controller from "../controllers/bookControllers/bookControllers"


const router = express.Router();

router.get('/', controller.getBooks);
router.get('/product/:id', controller.getBookById);
router.patch('/product/:id', controller.updateBookRating);
router.post('/seed', controller.seedByBooks);
router.post('/favorite', controller.addBookToFavorite);
router.post('/favorite/remove', controller.removeFromFavorite)

export default router;