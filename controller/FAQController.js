const FAQ = require("../models/FAQ");

module.exports = {
    async askQuetions(req, res) {
        try {
            const question = await FAQ.create({
                question: req.body.question
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
            const code = req.body.code
            if (code == 9960) {
                const faq = await FAQ.findOne({
                    where: {
                        id
                    }
                });
                await faq.update({
                    answer: req.body.answer
                });
                res.status(200).json(faq);
            }
            res.send("Only Owner can answer the quetion you Are not owner");
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    },

    async allFAQ(req, res) {
        try {
            const faq = await FAQ.findAll({});
            res.status(200).json(faq);
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    }

}