import pkg from 'pg';  // Importa o cliente PostgreSQL de forma compatível com CommonJS
const { Pool } = pkg;
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a pool de conexões para PostgreSQL
const conexao = new Pool({
  connectionString: process.env.DATABASE_URL,  // No Vercel, a variável de ambiente deve estar configurada corretamente
  ssl: {
    rejectUnauthorized: false  // Necessário para conectar com o Neon (e outros serviços em cloud)
  }
});


// Testa a conexão
conexao.connect()
  .then(() => console.log('Conectado ao banco de dados com sucesso!'))
  .catch((err) => console.error('Erro de conexão ao banco de dados:', err));

// Exporta a conexão para uso em outras partes do projeto
export default conexao;
