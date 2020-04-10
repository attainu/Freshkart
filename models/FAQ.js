const sequelize = require("../db");
const {
    Sequelize,
    Model
} = require("sequelize");

const faqSchema = {
    question: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "Not Answered Yet"
    }
};


class Faq extends Model {}
Faq.init(faqSchema, {
    sequelize,
    tableName: "faqs"
});



module.exports = Faq;