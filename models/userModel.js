import express from "express";
import conexao from "../config/db.js";

const createUser = async (nome, usuario, email, senha) => {
  try {
    // Verifica se o usuário já existe
    const { rows: existingUsers } = await conexao.query(
      "SELECT usuario FROM usuarios WHERE usuario = $1",
      [usuario]
    );

    if (existingUsers.length > 0) {
      return { status: 400, message: "Usuário já existe" };
    }

    // Insere o novo usuário e retorna os dados inseridos
    const { rows: result } = await conexao.query(
      "INSERT INTO usuarios (nome, usuario, email, senha) VALUES ($1, $2, $3, $4) RETURNING *",
      [nome, usuario, email, senha]
    );

    return {
      status: 201,
      message: "Usuário criado com sucesso",
      data: result[0],
    };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return {
      status: 500,
      message: "Erro ao criar usuário",
      error: error.message,
    };
  }
};

const getAllUsers = async () => {
  try {
    const result = await conexao.query(
      "SELECT * FROM usuarios WHERE excluido = 0"
    );
    return result.rows; // Retorna os dados (linhas) diretamente
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    return {
      status: 500,
      message: "Erro ao obter usuários",
      error: error.message,
    };
  }
};

const getUserByUserName = async (usuario) => {
  try {
    const { rows } = await conexao.query(
      "SELECT * FROM usuarios WHERE usuario = $1",
      [usuario]
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return {
      status: 500,
      message: "Erro ao buscar usuário",
      error: error.message,
    };
  }
};

const signInUser = async (usuario, senha) => {
  try {
    const { rows } = await conexao.query(
      "SELECT usuario_id, nome, usuario, email, telefone, admin, instrutor FROM usuarios WHERE usuario = $1 AND senha = $2",
      [usuario, senha]
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    return {
      status: 500,
      message: "Erro ao realizar login",
      error: error.message,
    };
  }
};

const editUserById = async (nome, usuario, email, usuario_id, telefone) => {
  try {
    const query = `
      UPDATE usuarios 
      SET nome = $1, usuario = $2, email = $3, telefone = $5
      WHERE usuario_id = $4
      RETURNING *
    `;

    const { rows } = await conexao.query(query, [
      nome,
      usuario,
      email,
      usuario_id,
      telefone,
    ]);

    return rows.length > 0
      ? {
          status: 200,
          message: "Usuário atualizado com sucesso",
          data: rows[0],
        }
      : { status: 404, message: "Usuário não encontrado" };
  } catch (error) {
    console.error("Erro ao atualizar o usuário:", error);
    return {
      status: 500,
      message: "Erro ao atualizar o usuário",
      error: error.message,
    };
  }
};

const deleteUserById = async (usuario_id, excluido) => {
  try {
    // if (!usuario_id) {
    //   throw new Error("O ID do usuário não foi fornecido.");
    // }

    const query = `
        UPDATE usuarios 
        SET excluido = $1
        WHERE usuario_id = $2
        RETURNING *
      `;

    const { rows } = await conexao.query(query, [usuario_id, excluido]);

    return rows.length > 0
      ? {
          status: 200,
          message: "Usuário excluído com sucesso",
          data: rows[0],
        }
      : { status: 404, message: "Usuário não encontrado" };
  } catch (error) {
    console.error("Erro ao excluir o usuário:", error);
    return {
      status: 500,
      message: "Erro ao excluir o usuário",
      error: error.message,
    };
  }
};

export default {
  createUser,
  signInUser,
  getAllUsers,
  getUserByUserName,
  editUserById,
  deleteUserById,
};
