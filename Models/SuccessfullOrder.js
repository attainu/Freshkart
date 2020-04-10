const sequelize = require("../db");
const {
    Sequelize,
    Model
} = require("sequelize");
const User = require("../models/User");
const successfullOrderSchema = {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    },
    userMail: {
        type: Sequelize.STRING,
        allowNull: true
    },
    order_id: {
        type: Sequelize.STRING,
        allowNull: true
    },
    order_value: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    order_status: {
        type: Sequelize.STRING,
        defaultValue: "pending"
    },
    cartItems: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
    }
};

class SuccessfullOrder extends Model {}
SuccessfullOrder.init(successfullOrderSchema, {
    sequelize,
    tableName: "successfullOrders"
});

module.exports = SuccessfullOrder;