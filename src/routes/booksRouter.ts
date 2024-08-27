const express = require('express');
import controller from "../controllers/bookControllers/bookControllers"


const router = express.Router();

router.get('/', controller.getAllBooks);
router.post('/seed', controller.seedByBooks);

export default router;