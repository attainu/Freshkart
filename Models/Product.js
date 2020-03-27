const sequelize = require("../db");
const {
    Sequelize,
    Model
} = require("sequelize");

const productSchema = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    timesSold: {
        type: Sequelize.INTEGER,
        default: 0
    }
};


class Product extends Model {}
Product.init(productSchema, {
    sequelize,
    tableName: "products"
});



module.exports = Product;