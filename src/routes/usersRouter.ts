const express = require('express');
import controller from "../controllers/userControllers/userControllers";


const router = express.Router();

router.get('/', controller.getAllUsers);
router.get('/me', controller.getMe);
router.post('/create', controller.createUser);
router.post('/login', controller.login);
router.patch('/update', controller.updateUserData)
router.patch('/avatar', controller.updateAvatar)

export default router;
