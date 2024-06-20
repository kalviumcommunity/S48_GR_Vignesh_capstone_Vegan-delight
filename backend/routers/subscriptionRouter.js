const express = require("express");
const subscriptionRouter = express.Router();
const subscriptionController = require("../controllers/subscriptionController");

// Define the endpoint to get all subscriptions
subscriptionRouter.get(
  "/subscriptions",
  subscriptionController.getAllSubscriptions
);
//Define the endpoint to create a new employee
subscriptionRouter.post(
  "/createsubscription",
  subscriptionController.createSubscription
);
module.exports = subscriptionRouter;
