const express = require('express');
import controller from "../controllers/cartControllers/cartControllers"


const router = express.Router();

router.post('/seed', controller.addBookInCart);

export default router;