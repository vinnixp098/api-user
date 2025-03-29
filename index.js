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

// Rodar o servidor localmente na porta 5000 (ou qualquer outra porta de sua escolha)
const port = 5000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});

// Exportando a função de handler para o Vercel (caso queira usar na Vercel também)
export default (req, res) => {
  app(req, res);  // Lida com a requisição e resposta via Express
};
