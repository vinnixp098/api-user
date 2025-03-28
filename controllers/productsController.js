import productModel from '../models/productModel.js';

const getAllProducts = async (req, res) => {
	try {
		const products = await productModel.getAllProducts();
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getSuggestions = async (req, res) => {
	try {
		const products = await productModel.getSuggestions();
		res.json(products);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createProduct = async (req, res) => {
	const { nomeProduto, acompanhamento, preco, url, tipoProduto} = req.body;
	try {
		const result = await productModel.createProduct(nomeProduto, acompanhamento, preco, url, tipoProduto);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Não foi possível cadastrar o produto' });
		}
		res.status(201);
		res.json({ message: 'Produto cadastrado com sucesso' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteProductById = async (req, res) => {
	const {id} = req.body;
	try {
		const result = await productModel.deleteProductById(id);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Não foi possível deletar o produto' });
		}
		res.json({ message: 'Produto deletado com sucesso' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const editProductById = async (req, res) => {
	const { nomeProduto, acompanhamento, preco, url, tipoProduto, id } = req.body;
	try {
		const result = await productModel.editProductById(nomeProduto, acompanhamento, preco, url, tipoProduto, id);
		if (result.affectedRows === 0) {
			return res.status(404).json({ message: 'Produto não encontrado' });
		}
		res.json({ message: 'Produto atualizado com sucesso' });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export default {
	getAllProducts,
	createProduct,
	getSuggestions,
	deleteProductById,
	editProductById
};
