const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");

// GET request to fetch all orders
orderRouter.get("/orders", orderController.getAllOrders);
//Define the endpoint to create a new order
orderRouter.post("/createorders", orderController.createOrder);
module.exports = orderRouter;
