import express from 'express';
import conexao from '../config/db.js';

const createUser = async (nome, usuario, email, senha) => {
  try {
    const [existingUsers] = await conexao.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);

    if (existingUsers.length > 0) {
      return { status: 400, message: 'Usuário já existe' };
    }

    const [result] = await conexao.query('INSERT INTO usuarios (nome, usuario, email, senha) VALUES (?, ?, ?, ?)', [nome, usuario, email, senha]);

    return { status: 201, message: 'Usuário criado com sucesso', data: result };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return { status: 500, message: 'Erro ao criar usuário', error: error.message };
  }
};

const getAllUsers = async () => {
  try {
    const result = await conexao.query('SELECT * FROM usuarios');
    return result.rows;  // Retorna os dados (linhas) diretamente
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return { status: 500, message: 'Erro ao obter usuários', error: error.message };
  }
};


const getUserByUserName = async (usuario, senha) => {
  try {
    const [rows] = await conexao.query('SELECT * FROM usuarios WHERE usuario = ? and senha = ?', [usuario, senha]);
    return rows;
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return { status: 500, message: 'Erro ao buscar usuário', error: error.message };
  }
};

const editUserById = async (nome, sobrenome, email, id) => {
  try {
    const query = `
      UPDATE usuarios 
      SET nome = ?, sobrenome = ?, email = ?, data_edicao = NOW()
      WHERE id = ?
    `;

    const [result] = await conexao.query(query, [nome, sobrenome, email, id]);
    return result;
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    return { status: 500, message: 'Erro ao atualizar o usuário', error: error.message };
  }
};

const deleteUserById = async (id) => {
  try {
    if (!id) {
      throw new Error("O ID do usuário não foi fornecido.");
    }

    const [result] = await conexao.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (result && result.affectedRows === 0) {
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
  deleteUserById
};
