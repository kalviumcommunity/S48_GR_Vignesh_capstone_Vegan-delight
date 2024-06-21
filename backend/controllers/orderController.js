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

// Update an existing order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { userId, orderItems, orderBill, orderDate } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      { userId, orderItems, orderBill, orderDate },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete an order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json({ msg: "Order deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
