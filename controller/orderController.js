const Orders = require("../models/Orders");
const User = require("../models/User");
const Cart = require("../models/Cart");
const SucessfullOrder = require("../models/SuccessfullOrder")
const instance = require("../utils/razorpay");
const createSignature = require("../utils/createSignature");
const {
  sendMailToUser,
  sendOrderStatus
} = require("../utils/generateEmail");
const {
  v4: uuid
} = require("uuid");

module.exports = {
  async order(req, res) {
    try {
      const id = req.user.id;
      const user = await User.findOne({
        where: {
          id
        }
      });
      const {
        amount
      } = req.body;
      const transactionId = uuid();
      const orderOptions = {
        currency: "INR",
        amount: amount * 100,
        receipt: transactionId,
        payment_capture: 0
      };
      const order = await instance.orders.create(orderOptions);
      const transaction = {
        userId: id,
        order_value: amount,
        order_id: order.id,
        razorpay_payment_id: null,
        razorpay_signature: null,
        isPending: true
      };
      const orderSave = await Orders.create({
        ...transaction
      });
      res.status(201).json({
        statusCode: 201,
        orderId: order.id,
        amount: transaction.order_value,
        email: user.dataValues.email,
        userId: req.user.id
      });
    } catch (err) {
      console.log(err);
      if (err.name === "ValidationError")
        return res.status(400).send(`Validation Error: ${err.message}`);
      res.send(err);
    }
  },

  async verify(req, res) {
    const {
      amount,
      currency,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id,
      email,
      userId
    } = req.body;
    try {
      const amountInRupees = amount / 100;
      const createdSignature = createSignature(
        razorpay_order_id,
        razorpay_payment_id
      );
      if (createdSignature !== razorpay_signature) {
        await sendMailToUser(
          email,
          "fail",
          amountInRupees,
          razorpay_payment_id,
          razorpay_order_id
        );
        return res.status(401).send({
          statusCode: 401,
          message: "Invalid payment request"
        });
      }
      const captureResponse = await instance.payments.capture(
        razorpay_payment_id,
        amount,
        currency
      );
      const transaction = await Orders.findOne({
        where: {
          order_id
        }
      });
      if (!transaction) {
        return res.status(401).send({
          statusCode: 401,
          message: "Invalid payment request"
        });
      }
      await transaction.update({
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,
        isPending: false,
        razorpay_order_id: razorpay_order_id
      });
      await sendMailToUser(
        email,
        "success",
        amountInRupees,
        razorpay_payment_id,
        razorpay_order_id
      );
      console.log("Mail send Successfully");
      const cartItems = await Cart.findAll({
        where: {
          userId
        }
      });
      const success = await SucessfullOrder.create({
        order_value: amount / 100,
        order_id,
        userId,
        cartItems,
        userMail: email
      });
      await Cart.destroy({
        where: {
          userId
        }
      });
      res.status(201).send({
        transaction,
        captureResponse,
        success
      });
    } catch (err) {
      console.log(err);
      if (err.name === "ValidationError")
        return res.status(400).send(`Validation Error: ${err.message}`);
      res.send(err);
    }
  },

  async status(req, res) {
    const {
      status
    } = req.body;
    const orderId = req.params.id
    try {
      const order = await SucessfullOrder.findOne({
        where: {
          id: orderId
        }
      });
      const email = order.dataValues.userMail;
      if (status === "accepted") {
        await order.update({
          order_status: "accepted",
        });
        await sendOrderStatus(email, "accepted")
        res.status(200).json(order)
      } else if (status === "rejected") {
        await order.update({
          order_status: "rejected",
        });
        await sendOrderStatus(email, "rejected")
        res.status(200).json(order)
      }
    } catch (err) {
      console.log(err);
      if (err.name === "ValidationError")
        return res.status(400).send(`Validation Error: ${err.message}`);
      res.send(err);
    }
  }
};