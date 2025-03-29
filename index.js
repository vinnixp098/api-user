import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Middleware para CORS
app.use(cors());

// Middleware para parser JSON
app.use(express.json());

// Middleware para rotas de usuário
app.use('/api', userRoutes);

// Função para lidar com a requisição HTTP
app.get('/test', (req, res) => {
  res.send('API está funcionando!');
});

// Exportando a função de handler para o Vercel
export default (req, res) => {
  app(req, res);  // Lida com a requisição e resposta via Express
};
