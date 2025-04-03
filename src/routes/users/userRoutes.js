import express from 'express';
const router = express.Router();
import UserController from '../../controllers/users/userController.js';

router.get('/getAllUsers', UserController.getAllUsers);
router.post('/ediUser', UserController.editUserById);
router.post('/createUSer', UserController.createUSer);
router.get('/getUser', UserController.getUserByUserName);
router.post('/signInUser', UserController.signInUser);
router.post('/signInUserByToken', UserController.signInUserByToken); // utiliza query params
router.post('/deletar-usuario', UserController.deleteUserById); // utiliza query params

export default router;
