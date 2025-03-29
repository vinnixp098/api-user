import { Pool } from 'pg';  // Importa o cliente PostgreSQL
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a pool de conexões para PostgreSQL
const conexao = new Pool({
  connectionString: process.env.DB_HOST,  // A URL do banco de dados no formato postgresql://...
  ssl: {
    rejectUnauthorized: false  // Necessário para conexões com SSL (usado no Neon)
  }
});

// Exporta a conexão para uso em outras partes do projeto
export default conexao;
