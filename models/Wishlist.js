const sequelize = require("../db");
const {
    Sequelize,
    Model
} = require("sequelize");
const User = require("../models/User");
const Product = require("../models/Product");
const wishlistSchema = {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
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
    }
}

class Wishlist extends Model {}
Wishlist.init(wishlistSchema, {
    sequelize,
    tableName: "wishlists"
});
module.exports = Wishlist;