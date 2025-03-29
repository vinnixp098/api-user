import UserModel from "../models/userModel.js";

const createUSer = async (req, res) => {
  const { nome, usuario, email, senha } = req.body;
  console.log(nome, usuario, email, senha);

  try {
    const result = await UserModel.createUser(nome, usuario, email, senha);

    if (!result.data) {
      return res
        .status(400)
        .json({ message: "Já existe um usuário com esse nome" });
    }

    res.status(201).json({
      message: "Usuário cadastrado com sucesso",
      usuario: result.data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  const { usuario_id, excluido } = req.body;
  try {
    const result = await UserModel.deleteUserById(usuario_id, excluido);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Não foi possível deletar o usuário" });
    }
    res.json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserByUserName = async (req, res) => {
  const { usuario } = req.body;
  try {
    const result = await UserModel.getUserByUserName(usuario);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Não foi possível encontrar o usuário" });
    }
    res.json({
      status: "success",
      message: "Usuário encontrado",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const signInUser = async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const result = await UserModel.signInUser(usuario, senha);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Não foi possível realizar o login" });
    }
    res.json({
      message: "Login realizado com sucesso",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers(); // Obtém os usuários
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Nenhum usuário encontrado" });
    }
    res.json({
      message: "Usuários encontrados",
      data: users, // Envia os usuários no corpo da resposta
    });
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    res.status(500).json({ error: err.message });
  }
};

const editUserById = async (req, res) => {
  const { nome, usuario, email, usuario_id, telefone } = req.body;
  try {
    const result = await UserModel.editUserById(
      nome,
      usuario,
      email,
      usuario_id,
      telefone
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  createUSer,
  signInUser,
  getAllUsers,
  getUserByUserName,
  editUserById,
  deleteUserById,
};
