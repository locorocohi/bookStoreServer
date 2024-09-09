const express = require('express');
import controller from "../controllers/commentControllers/commentControllers"


const router = express.Router();

router.get('/', controller.getComments);
router.post('/create', controller.createComment)

export default router;