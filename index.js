import express from 'express';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productsRoutes.js'
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware para CORS
app.use(cors());

// Middleware para parser JSON
app.use(express.json());

// Middleware para rotas de usuário
app.use('/api', userRoutes);
app.use('/usuario', userRoutes);
app.use('/dados-fotos', productRoutes);
app.use('/dados-produtos', productRoutes);

// Rota de teste
app.get('/test', (req, res) => {
  res.send('API está funcionando!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
