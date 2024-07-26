const express = require('express')
import controller from "../controllers/userControllers/userControllers";


const router = express.Router()

router.get('/', controller.getAllUsers)
router.post('/create', controller.createUser)

export default router;
