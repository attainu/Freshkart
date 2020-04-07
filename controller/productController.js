const Product = require("../models/Product");
const FAQ = require("../models/ProductFAQ");
const Review = require("../models/Review");

module.exports = {
    async createProduct(req, res) {
        try {
            const product = await Product.create({
                ...req.body
            });
            res.status(200).json(product);
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },
    async getProducts(req, res) {
        try {
            const product = await Product.findAll({});
            res.status(200).json(product);
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },
    async productDetails(req, res) {
        try {
            const id = req.params.id
            const product = await Product.findOne({
                where: {
                    id
                }
            });
            const faq = await FAQ.findAll({
                where: {
                    productId: id
                }
            });
            const review = await Review.findAll({
                where: {
                    productId: id
                }
            });
            res.status(200).json({
                product,
                faq,
                review
            });
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },
    async searchProducts(req, res) {
        try {
            const category = req.params.category
            const product = await Product.findAll({
                where: {
                    category
                }
            });
            res.status(200).json(product);
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    }

}