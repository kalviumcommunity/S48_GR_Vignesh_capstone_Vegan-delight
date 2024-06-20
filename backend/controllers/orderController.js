const Order = require("../models/Order");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { userId, orderItems, orderBill, orderDate } = req.body;
    const newOrder = new Order({
      userId,
      orderItems,
      orderBill,
      orderDate,
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllOrders,
  createOrder,
};
