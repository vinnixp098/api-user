import conexao from '../config/db.js';

// Função para criar usuário
const createUser = async (nome, usuario, email, senha) => {
  try {
    // Verifica se o usuário já existe
    const result = await conexao.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);

    if (result.rows.length > 0) {
      return { status: 400, message: 'Usuário já existe' };
    }

    // Insere o novo usuário
    const insertResult = await conexao.query(
      'INSERT INTO usuarios (nome, usuario, email, senha) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, usuario, email, senha]
    );

    return { status: 201, message: 'Usuário criado com sucesso', data: insertResult.rows[0] };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return { status: 500, message: 'Erro ao criar usuário', error: error.message };
  }
};

// Função para obter todos os usuários
const getAllUsers = async () => {
  try {
    const result = await conexao.query('SELECT * FROM usuarios');
    return result.rows;  // Retorna os dados dos usuários
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return { status: 500, message: 'Erro ao obter usuários', error: error.message };
  }
};

// Função para buscar usuário por nome de usuário e senha
const getUserByUserName = async (usuario, senha) => {
  try {
    const result = await conexao.query(
      'SELECT * FROM usuarios WHERE usuario = $1 AND senha = $2',
      [usuario, senha]
    );
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { status: 500, message: 'Erro ao buscar usuário', error: error.message };
  }
};

// Função para editar usuário por ID
const editUserById = async (nome, sobrenome, email, id) => {
  try {
    const query = `
      UPDATE usuarios 
      SET nome = $1, sobrenome = $2, email = $3, data_edicao = NOW() 
      WHERE id = $4 RETURNING *
    `;

    const result = await conexao.query(query, [nome, sobrenome, email, id]);
    return result.rows[0];  // Retorna o usuário atualizado
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    return { status: 500, message: 'Erro ao atualizar o usuário', error: error.message };
  }
};

// Função para excluir usuário por ID
const deleteUserById = async (id) => {
  try {
    if (!id) {
      throw new Error("O ID do usuário não foi fornecido.");
    }

    const result = await conexao.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return { message: `Nenhum usuário encontrado com o ID: ${id}` };
    }

    return { message: `Usuário com o ID: ${id} foi excluído com sucesso.`, result: result.rows[0] };
  } catch (error) {
    console.error("Erro ao excluir o usuário:", error.message);
    return { message: "Erro ao excluir o usuário.", error: error.message };
  }
};

export default {
  createUser, 
  getAllUsers,
  getUserByUserName,
  editUserById,
  deleteUserById
};
