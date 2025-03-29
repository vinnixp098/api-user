import { query } from 'express';
import conexao from '../config/db.js';

const createUser = async (nome, usuario, email, senha) => {
  const [existingUsers] = await conexao.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

  if (existingUsers.length > 0) {
    return { status: 400, message: 'Usuário já existe' };
  }

  const [result] = await conexao.query('INSERT INTO usuarios (nome, usuario, email, senha) VALUES (?, ?, ?, ?)', [nome, usuario, email, senha]);

  return { status: 201, message: 'Usuário criado com sucesso', data: result };
};


const getAllUsers = async () => {
  const [rows] = await conexao.query('SELECT * FROM usuarios');
  return rows;
};


const getUserByUserName = async (usuario, senha) => {
  const [rows] = await conexao.query('SELECT * FROM usuarios WHERE usuario = ? and senha = ?', [usuario, senha]);
  return rows;
};

const editUserById = async (nome, sobrenome, email, id) => {
  try {
    const query = `
      UPDATE clientes 
      SET nome = ?, sobrenome = ?, email = ?, data_edicao = NOW()
      WHERE usuario_id = ?
    `;

    const [result] = await conexao.query(query, [nome, sobrenome, email, id]);
    return result;


  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
  }
};


const deleteUSerById = async (id, excluido) => {
  try {
    console.log("Id:", id);

    if (!id) {
      throw new Error("O ID do usuário não foi fornecido.");
    }

    const [result] = await conexao.query('DELETE FROM usuarios WHERE usuario_id = ?', [id]);

    if (result && result.affectedRows === 0) {
      console.log(`Nenhum usuário encontrado com o ID: ${id}`);
      return { message: `Nenhum usuário encontrado com o ID: ${id}` };
    }

    return { message: `Usuário com o ID: ${id} foi excluído com sucesso.`, result };
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
  deleteUSerById
};
