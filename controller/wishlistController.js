const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");


module.exports = {
    async addToWishlist(req, res) {
        try {
            const id = req.params.id
            const wishlistProduct = await Product.findOne({
                where: {
                    id
                }
            });
            const check = await Wishlist.findOne({
                where: {
                    productId: id
                }
            })
            if (check) {
                return res.status(401).send("already added in Wishlist");
            }
            const wishlistProductBody = {
                productId: wishlistProduct.id,
                userId: req.user.id,
                name: wishlistProduct.name,
                image: wishlistProduct.image,
                category: wishlistProduct.category,
                price: wishlistProduct.price,
                description: wishlistProduct.description
            };
            const wishlist = await Wishlist.create({
                ...wishlistProductBody
            });
            res.status(200).send("added to Wishist successfullly");
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err);
        }
    },

    async removeFromWishlist(req, res) {
        try {
            const productId = req.params.id
            const userId = req.user.id
            await Wishlist.destroy({
                where: {
                    productId,
                    userId
                }
            });
            res.send("removed from Wishist successfully");
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },

    async wishlists(req, res) {
        try {
            const userId = req.user.id;
            const wishlistProducts = await Wishlist.findAll({
                where: {
                    userId
                }
            });
            res.status(200).json(wishlistProducts);
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    }
}