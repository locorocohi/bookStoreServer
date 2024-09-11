const express = require('express');
import controller from "../controllers/cartControllers/cartControllers"


const router = express.Router();

router.post('/add', controller.addBookInCart);

export default router;