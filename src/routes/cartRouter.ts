const express = require('express');
import controller from "../controllers/cartControllers/cartControllers"


const router = express.Router();

router.get('/', controller.getBooksFromCart);
router.post('/add', controller.addBookInCart);
router.patch('/edit', controller.editBookInCart);

export default router;