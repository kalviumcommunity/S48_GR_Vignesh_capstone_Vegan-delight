const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

// GET request to fetch all orders
orderRouter.get("/", orderController.getAllOrders);

module.exports = orderRouter;
