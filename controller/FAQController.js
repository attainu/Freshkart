const FAQ = require("../models/FAQ");

module.exports = {
    async askQuetions(req, res) {
        try {
            const question = await FAQ.create({
                question: req.body.question
            });
            res.status(200).send("Quetion Posted Successfully");
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
            const faq = await FAQ.findOne({
                where: {
                    id
                }
            });
            await faq.update({
                answer: req.body.answer
            });
            res.status(200).send({
                faq,
                massage: "done"
            });
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
    },

    async deleteFAQ(req, res) {
        try {
            const id = req.params.id
            const code = req.body.code
            if (code == process.env.CODE) {
                const faq = await FAQ.findOne({
                    where: {
                        id
                    }
                });
                await FAQ.destroy({
                    where: {
                        id
                    }
                });
                res.status(200).send("Question deleted successfully");
            }
            res.send("Only Owner can delete  the quetion you Are not owner");
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`);
            res.send(err.message);
        }
    }

}