const express = require('express');
import controller from "../controllers/userControllers/userControllers";


const router = express.Router();

router.get('/', controller.getAllUsers);
router.get('/me', controller.getMe);
router.post('/create', controller.createUser);
router.post('/login', controller.login);
router.patch('/avatar', controller.updateAvatar)
router.patch('/changeinfo', controller.changeInfo)
router.patch('/changepassword', controller.changePassword)
router.delete('/delete/:id', controller.deleteUser)

export default router;
