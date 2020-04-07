const sequelize = require("../db");
const {
    Sequelize,
    Model
} = require("sequelize");
const User = require("../models/User");
const Product = require("../models/Product");
const reviewSchema = {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    }
}

class Review extends Model {}
Review.init(reviewSchema, {
    sequelize,
    tableName: "reviews"
});
module.exports = Review;