const express = require("express");
const subscriptionRouter = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// Define the endpoint to get all subscriptions
subscriptionRouter.get("/", subscriptionController.getAllSubscriptions);

module.exports = subscriptionRouter;
