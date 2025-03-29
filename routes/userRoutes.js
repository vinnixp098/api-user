import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';

router.get('/getAllUsers', UserController.getAllUsers);
router.post('/ediUser', UserController.editUserById);
router.post('/signUpUser', UserController.createUSer);
router.get('/getUser', UserController.getUserByUserName);
router.post('/signInUser', UserController.signInUser);
router.post('/deletar-usuario', UserController.deleteUserById); // utiliza query params

export default router;
