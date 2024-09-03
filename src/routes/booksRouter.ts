const express = require('express');
import controller from "../controllers/bookControllers/bookControllers"


const router = express.Router();

router.get('/', controller.getBooks);
router.get('/product/:id', controller.getBookById)
router.post('/seed', controller.seedByBooks);

export default router;