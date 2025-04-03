import UserModel from "../../models/users/userModel.js";

const createUSer = async (req, res) => {
  const { nome, usuario, email, senha } = req.body;
  console.log(nome, usuario, email, senha);

  try {
    const result = await UserModel.createUser(nome, usuario, email, senha);

    if (!result.data) {
      return res.status(400).json({
        status: "error",
        message: "Já existe um usuário com esse nome",
        data: null,
      });
    }

    res.status(201).json({
      status: "success",
      message: "Usuário cadastrado com sucesso",
      usuario: null,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  const { usuario_id } = req.query;
  try {
    const result = await UserModel.deleteUserById(usuario_id);
    if (result.rows === 0) {
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
    if (result.rows === 0) {
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
    if (result.length === 0) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Não foi possível realizar o login",
          data: null,
        });
    }
    res.json({
      status: "success",
      message: "Login realizado com sucesso",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const signInUserByToken = async (req, res) => {
  const { token } = req.query;
  try {
    const result = await UserModel.signInUserByToken(token);
    if (result.length === 0) {
      return res
        .status(400)
        .json({
          status: "error",
          message: "Erro ao recuperar usuário pelo token",
          data: null,
        });
    }
    res.json({
      status: "success",
      message: "Usuário recuperado pelo token com sucesso",
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
      status: "success",
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
  signInUserByToken,
  getAllUsers,
  getUserByUserName,
  editUserById,
  deleteUserById,
};
