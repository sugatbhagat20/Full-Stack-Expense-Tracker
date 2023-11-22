const razorpay = require("razorpay");
const order = require("../model/orderModel");
const userController = require("./userController");
require("dotenv").config();
exports.purchasePremium = async (req, res) => {
  try {
    var rzp = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = 22000;
    //console.log("Entered in Controller");
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        //throw new Error(JSON.stringify(err));
        console.log(err);
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went wrong", error: err });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const Order = await order.findOne({ where: { orderid: order_id } });
    const promise1 = Order.update({
      paymentid: payment_id,
      status: "SUCCESSFUL",
    });
    const promise2 = req.user.update({
      isPremiumUser: true,
      order_id: order_id,
    });

    Promise.all([promise1, promise2])
      .then(() => {
        return res
          .status(202)
          .json({ success: true, message: "Transaction Successful" });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err, message: "Something went wrong" });
  }
};

exports.failedTransactionStatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const Order = await order.findOne({ where: { orderid: order_id } });

    const promise1 = Order.update({
      paymentid: payment_id,
      status: "FAILED",
    });
    const promise2 = req.user.update({
      order_id: order_id,
    });

    Promise.all([promise1, promise2])
      .then(() => {
        return res
          .status(202)
          .json({ success: false, message: "Transaction Failed" });
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (err) {
    console.log(err);
    res.status(403).json({ error: err, message: "Something went wrong" });
  }
};
