import express from "express";
import conexao from "../../../config/db.js";
import crypto from "crypto";

const createUser = async (nome, usuario, email, senha) => {
  try {
    const { rows: existingUsers } = await conexao.query(
      "SELECT usuario FROM usuarios WHERE usuario = $1",
      [usuario]
    );

    if (existingUsers.length > 0) {
      return { status: 400, message: "Usuário já existe" };
    }

    const token = crypto.createHash("md5").update(email + Date.now()).digest("hex");

    const { rows: result } = await conexao.query(
      "INSERT INTO usuarios (nome, usuario, email, senha, token) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nome, usuario, email, senha, token]
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
    return result.rows;
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
      "SELECT usuario_id, nome, usuario, email, telefone, admin, instrutor FROM usuarios WHERE usuario = $1 AND senha = $2 AND excluido = 0",
      [usuario, senha]
    );

    return rows.length > 0 ? rows[0] : [];
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

const deleteUserById = async (usuario_id) => {
  try {
    const query = `
        UPDATE usuarios 
        SET excluido = 1
        WHERE usuario_id = $1
        RETURNING *
      `;

    const { rows } = await conexao.query(query, [usuario_id]);

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
