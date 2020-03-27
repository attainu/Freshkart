const PFAQ = require("../models/ProductFAQ");

module.exports = {
    async askQuetions(req, res) {
        const id = req.params.id
        try {
            const question = await PFAQ.create({
                question: req.body.question,
                productId: id,
            });
            res.send("Quetion Posted Successfully");
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },
    async answers(req, res) {
        try {
            const id = req.params.id
            const faq = await PFAQ.findOne({
                where: {
                    id
                }
            });
            await faq.update({
                answer: req.body.answer
            });
            res.status(200).json(faq);
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },
    async allFAQ(req, res) {
        const productId = req.params.id
        try {
            const faq = await PFAQ.findAll({
                where: {
                    productId
                }
            });
            res.status(200).json(faq);
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    }
}