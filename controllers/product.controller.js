import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, currency, stock } = req.body;
        const product = await Product.create({ name, description, price, currency, stock });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
}