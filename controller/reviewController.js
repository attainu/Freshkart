const Review = require("../models/Review");
const User = require("../models/User");
module.exports = {
    async addReview(req, res) {
        try {
            const id = req.params.id
            const user = await User.findOne({
                where: {
                    id: req.user.id
                }
            });

            const check = await Review.findOne({
                where: {
                    productId: id,
                    userId: req.user.id
                }
            })
            if (check) {
                await check.update({
                    ...req.body
                });
                return res.send({
                    massage: "You already added review so your review is updated now"
                });
            }
            const body = {
                ...req.body,
                productId: id,
                userId: req.user.id,
                userName: user.dataValues.name
            };
            const review = await Review.create({
                ...body
            });
            res.status(200).send({
                massage: "done"
            });
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err);
        }
    },

    async editReview(req, res) {
        try {
            const productId = req.params.id
            const userId = req.user.id
            const review = await Review.findOne({
                where: {
                    productId,
                    userId
                }
            });
            if (!review) {
                return res.status(401).send("please add review first");
            }
            await review.update({
                ...req.body
            });
            res.send("review updated sucessfully");
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },

    async reviews(req, res) {
        try {
            const productId = req.params.id
            const reviews = await Review.findAll({
                where: {
                    productId
                }
            });
            res.status(200).json(reviews);
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    }
}