const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/orderController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// GET request to fetch all orders
orderRouter.get("/orders", orderController.getAllOrders);
//Define the endpoint to create a new order
orderRouter.post("/createorders", orderController.createOrder);
//Define the endpoint to update an existing order
orderRouter.put("/updateorder/:id", orderController.updateOrder);
//Define the endpoint to Delete an existing order
orderRouter.delete("/deleteorder/:id", orderController.deleteOrder);

module.exports = orderRouter;
