const Product = require("../models/Product");
const FAQ = require("../models/ProductFAQ");
const Review = require("../models/Review");
const convertBufferToString = require("../utils/convertBufferToString");
const cloudinary = require("../utils/cloudinary");
const {
    Sequelize
} = require("sequelize");

module.exports = {
    async createProduct(req, res) {
        try {
            const imageContent = convertBufferToString(
                req.file.originalname,
                req.file.buffer
            );
            const imageRes = await cloudinary.uploader.upload(imageContent)
            const lastProduct = await Product.findOne({
                order: [
                    ['id', 'DESC']
                ]
            });
            const product = await Product.create({
                id: lastProduct.dataValues.id + 1,
                ...req.body,
                image: imageRes.secure_url
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