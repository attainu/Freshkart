const Cart = require("../models/Cart");
const Product = require("../models/Product");


module.exports = {
    async addToCart(req, res) {
        try {
            const id = req.params.id
            const cartProduct = await Product.findOne({
                where: {
                    id
                }
            });
            const check = await Cart.findOne({
                where: {
                    productId: id
                }
            })
            if (check) {
                return res.status(401).send("already added in Cart");
            }
            const cartProductBody = {
                productId: cartProduct.id,
                userId: req.user.id,
                name: cartProduct.name,
                image: cartProduct.image,
                category: cartProduct.category,
                price: cartProduct.price,
                description: cartProduct.description
            };
            const cart = await Cart.create({
                ...cartProductBody
            });
            await cartProduct.update({
                timesSold: cartProduct.timesSold + 1
            });

            res.status(200).send("added to cart successfullly");
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err);
        }
    },

    async removeFromCart(req, res) {
        try {
            const productId = req.params.id
            const userId = req.user.id
            await Cart.destroy({
                where: {
                    productId,
                    userId
                }
            });
            res.send("removed from cart successfully");
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },

    async carts(req, res) {
        try {
            const userId = req.user.id;
            const cartProducts = await Cart.findAll({
                where: {
                    userId
                }
            });
            res.status(200).json(cartProducts);
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    }
}