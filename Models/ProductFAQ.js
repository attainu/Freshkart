const sequelize = require("../db");
const {
    Sequelize,
    Model
} = require("sequelize");
const Product = require("../models/Product");

const productFAQSchema = {
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
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


class ProductFAQ extends Model {}
ProductFAQ.init(productFAQSchema, {
    sequelize,
    tableName: "productFAQs"
});



module.exports = ProductFAQ;