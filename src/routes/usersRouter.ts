const express = require('express')
import controller from "../controllers/userControllers/userControllers";


const router = express.Router()

router.get('/', controller.getAllUsers)
router.get('/me', controller.getMe)
router.post('/create', controller.createUser)
router.post('/login', controller.login)

export default router;
