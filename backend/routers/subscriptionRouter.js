const express = require("express");
const subscriptionRouter = express.Router();
const subscriptionController = require("../controllers/subscriptionController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// Define the endpoint to get all subscriptions
subscriptionRouter.get(
  "/subscriptions",
  subscriptionController.getAllSubscriptions
);
//Define the endpoint to create a new subscription
subscriptionRouter.post(
  "/createsubscription",
  subscriptionController.createSubscription
);
//Define the endpoint to update an existing subscription
subscriptionRouter.put(
  "/updatesubscription/:id",
  subscriptionController.updateSubscription
);
//Define the endpoint to Delete an existing subscription
subscriptionRouter.delete(
  "/delelesubscription/:id",
  subscriptionController.deleteSubscription
);

module.exports = subscriptionRouter;
