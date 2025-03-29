import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';

router.get('/usuarios', UserController.getAllUsers);
router.post('/editar-nome', UserController.editUserById);
router.post('/cadastro', UserController.createUSer);
router.get('/getUser', UserController.getUserByUserName);
router.post('/signUser', UserController.signInUser);
router.post('/deletar-usuario', UserController.deleteUserById);

export default router;
