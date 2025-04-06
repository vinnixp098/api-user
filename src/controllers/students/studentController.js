import StudentModel from "../../models/students/studentModel.js";

const createStudent = async (req, res) => {
    const { nome, cpf, telefone, categoria, data_inicio_processo, data_final_processo } = req.body;
    console.log(nome, cpf, telefone, categoria, data_inicio_processo, data_final_processo);

    try {
        const result = await StudentModel.createStudent(nome, cpf, telefone, categoria, data_inicio_processo, data_final_processo)

        if (!result.data) {
            return res.status(400).json({
                status: "error",
                message: "Já existe um aluno cadastrado para esse cpf",
                data: null,
            });
        }

        res.status(201).json({
            status: "success",
            message: "Aluno cadastrado com sucesso",
            usuario: null,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// const deleteUserById = async (req, res) => {
//     const { usuario_id } = req.query;
//     try {
//         const result = await StudentModel.deleteUserById(usuario_id);
//         if (result.rows === 0) {
//             return res
//                 .status(404)
//                 .json({ message: "Não foi possível deletar o usuário" });
//         }
//         res.json({ message: "Usuário deletado com sucesso" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

const getStudentByCpf = async (req, res) => {
    const { usuario } = req.body;
    try {
        const result = await StudentModel.getStudentByCpf(usuario);
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

// const signInUser = async (req, res) => {
//     const { usuario, senha } = req.body;
//     try {
//         const result = await StudentModel.signInUser(usuario, senha);
//         if (result.length === 0) {
//             return res
//                 .status(400)
//                 .json({
//                     status: "error",
//                     message: "Não foi possível realizar o login",
//                     data: null,
//                 });
//         }
//         res.json({
//             status: "success",
//             message: "Login realizado com sucesso",
//             data: result,
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.getAllStudents();
        if (!students || students.length === 0) {
            return res.status(404).json({ message: "Nenhum aluno encontrado" });
        }
        res.json({
            status: "success",
            message: "Alunos encontrados",
            data: students,
        });
    } catch (err) {
        console.error("Erro ao buscar alunos:", err);
        res.status(500).json({ error: err.message });
    }
};

// const editUserById = async (req, res) => {
//     const { nome, usuario, email, usuario_id, telefone } = req.body;
//     try {
//         const result = await StudentModel.editUserById(
//             nome,
//             usuario,
//             email,
//             usuario_id,
//             telefone
//         );
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "Usuário não encontrado" });
//         }
//         res.json({ message: "Usuário atualizado com sucesso" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
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
