import express from "express";
import conexao from "../../../config/db.js";
import crypto from "crypto";

const createStudent = async (nome, cpf, telefone, categoria, data_inicio_processo, data_final_processo) => {
    try {
        const { rows: existingUsers } = await conexao.query(
            "SELECT nome FROM alunos WHERE cpf = $2",
            [cpf]
        );

        const { rows: getGategory } = await conexao.query(
            "SELECT categoria_descricao FROM categorias WHERE categoria = $4",
            [categoria]
        );

        if (existingUsers.length > 0) {
            return { status: 400, message: "O aluno já existe" };
        }

        const hoje = new Date();

        // const token = crypto.createHash("md5").update(email + Date.now()).digest("hex");

        const { rows: result } = await conexao.query(
            "INSERT INTO alunos (nome, cpf, telefone, categoria, categoria_descricao, data_inicio_processo, data_final_processo, data_matricula ) VALUES ($1, $2, $3, $4, $5, $6, $7, ) RETURNING *",
            [nome, cpf, telefone, categoria, getGategory, data_inicio_processo, data_final_processo, hoje]
        );

        return {
            status: 201,
            message: "Aluno cadastrado com sucesso",
            data: result[0],
        };
    } catch (error) {
        console.error("Erro ao cadastrar aluno:", error);
        return {
            status: 500,
            message: "Erro ao cadastrar aluno",
            error: error.message,
        };
    }
};


const getAllStudents = async () => {
    try {
        const result = await conexao.query(
            "SELECT * FROM alunos"
        );
        return result.rows;
    } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        return {
            status: 500,
            message: "Erro ao buscar alunos",
            error: error.message,
        };
    }
};

const getStudentByCpf = async (cpf) => {
    try {
        const { rows } = await conexao.query(
            "SELECT * FROM alunos WHERE cpf = $1",
            [cpf]
        );

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        return {
            status: 500,
            message: "Erro ao buscar aluno",
            error: error.message,
        };
    }
};

// const signInUser = async (usuario, senha) => {
//     try {
//         const { rows } = await conexao.query(
//             "SELECT usuario_id, nome, usuario, email, telefone, admin, instrutor FROM usuarios WHERE usuario = $1 AND senha = $2 AND excluido = 0",
//             [usuario, senha]
//         );

//         return rows.length > 0 ? rows[0] : [];
//     } catch (error) {
//         console.error("Erro ao realizar login:", error);
//         return {
//             status: 500,
//             message: "Erro ao realizar login",
//             error: error.message,
//         };
//     }
// };

// const editUserById = async (nome, usuario, email, usuario_id, telefone) => {
//     try {
//         const query = `
//       UPDATE usuarios 
//       SET nome = $1, usuario = $2, email = $3, telefone = $5
//       WHERE usuario_id = $4
//       RETURNING *
//     `;

//         const { rows } = await conexao.query(query, [
//             nome,
//             usuario,
//             email,
//             usuario_id,
//             telefone,
//         ]);

//         return rows.length > 0
//             ? {
//                 status: 200,
//                 message: "Usuário atualizado com sucesso",
//                 data: rows[0],
//             }
//             : { status: 404, message: "Usuário não encontrado" };
//     } catch (error) {
//         console.error("Erro ao atualizar o usuário:", error);
//         return {
//             status: 500,
//             message: "Erro ao atualizar o usuário",
//             error: error.message,
//         };
//     }
// };

// const deleteUserById = async (usuario_id) => {
//     try {
//         const query = `
//         UPDATE usuarios 
//         SET excluido = 1
//         WHERE usuario_id = $1
//         RETURNING *
//       `;

//         const { rows } = await conexao.query(query, [usuario_id]);

//         return rows.length > 0
//             ? {
//                 status: 200,
//                 message: "Usuário excluído com sucesso",
//                 data: rows[0],
//             }
//             : { status: 404, message: "Usuário não encontrado" };
//     } catch (error) {
//         console.error("Erro ao excluir o usuário:", error);
//         return {
//             status: 500,
//             message: "Erro ao excluir o usuário",
//             error: error.message,
//         };
//     }
// };

export default {
    createStudent,
    // signInUser,
    getAllStudents,
    getStudentByCpf,
    // editUserById,
    // deleteUserById,
};
