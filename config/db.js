import pkg from 'pg';  // Importa o cliente PostgreSQL de forma compatível com CommonJS
const { Pool } = pkg;
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a pool de conexões para PostgreSQL
const conexao = new Pool({
  connectionString: process.env.DATABASE_URL,  // Usa a variável de ambiente DATABASE_URL
  ssl: {
    rejectUnauthorized: false  // Necessário para conexões com SSL (usado no Neon)
  }
});

// Exporta a conexão para uso em outras partes do projeto
export default conexao;
