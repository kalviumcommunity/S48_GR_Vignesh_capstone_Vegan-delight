const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    orderBill: { type: Number, required: true },
    orderDate: { type: Date, required: true, default: Date.now },
  },
  { collection: "orders" }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
