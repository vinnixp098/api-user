import express from 'express';
const router = express.Router();
import productsController from '../controllers/productsController.js';

router.get('/produtos', productsController.getAllProducts);
router.get('/sugestoes', productsController.getSuggestions);
router.post('/cadastrar-produto', productsController.createProduct);
router.post('/deletar-produto', productsController.deleteProductById);
router.post('/editar-produto', productsController.editProductById);

export default router;
