import mysql from 'mysql2';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a pool de conexões
const conexao = mysql.createPool({
  host: process.env.DB_HOST,       // Endereço do host do banco de dados
  user: process.env.DB_USER,       // Usuário do banco de dados
  password: process.env.DB_PASSWORD, // Senha do banco de dados
  database: process.env.DB_DATABASE  // Nome do banco de dados
}).promise();

// Exporta a conexão para uso em outras partes do projeto
export default conexao;
