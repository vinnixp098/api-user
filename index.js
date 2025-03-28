import express from 'express';
import userRoutes from '../routes/userRoutes.js';
import cors from 'cors';

const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para parser JSON
app.use(express.json());

// Middleware para rotas de usuário
app.use('/api', userRoutes);

// Função para lidar com a requisição HTTP
export default (req, res) => {
  app(req, res);
};
