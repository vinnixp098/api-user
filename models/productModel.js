import { query } from 'express';
import conexao from '../config/db.js';

const getAllProducts = async () => {
  const [rows] = await conexao.query('SELECT * FROM estudos.produtos');
  return rows;
};

const getSuggestions = async () => {
  const [rows] = await conexao.query('SELECT * FROM estudos.produtos WHERE tipo_produto = "sugestao"');
  return rows;
};

const createProduct = async (nomeProduto, acompanhamento, preco, url, tipoProduto) => {
  console.log(nomeProduto, acompanhamento, preco, url, tipoProduto)
  const [rows] = await conexao.query('INSERT INTO estudos.produtos (produto_descricao, acompanhamento, preco, url, tipo_produto) VALUES (?, ?, ?, ?, ?)', [nomeProduto, acompanhamento, preco, url, tipoProduto]);
  console.log("rows:", rows)
  return rows;
};

const deleteProductById = async (id) => {
  try {
    console.log("Id:", id);

    // Executa a query de exclusão
    const [result] = await conexao.query('DELETE FROM estudos.produtos WHERE produto_id = ?', [id]);

    return { message: `Produto com o ID: ${id} foi excluído com sucesso.`, result };
  } catch (error) {
    console.error("Erro ao excluir o produto:", error.message);
    return { message: "Erro ao excluir o produto.", error: error.message };
  }
};

const editProductById = async (nomeProduto, acompanhamento, preco, url, tipoProduto, id) => {
  console.log("Dados vindos: ", nomeProduto, acompanhamento, preco, url, tipoProduto, id);
  try {
    const query = `
      UPDATE estudos.produtos 
      SET produto_descricao = ?, acompanhamento = ?, preco = ?, url = ?, tipo_produto = ?
      WHERE produto_id = ?
    `;

    const [result] = await conexao.query(query, [nomeProduto, acompanhamento, preco, url, tipoProduto, id]);
    console.log("Id:", id);
    console.log('Produto atualizado com sucesso:', result);
    return result;

   
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
  }
};

export default {
    getAllProducts,
    createProduct,
    getSuggestions,
    deleteProductById,
    editProductById
};
