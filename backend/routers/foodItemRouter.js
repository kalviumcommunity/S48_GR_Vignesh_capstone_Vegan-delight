const express = require("express");
const foodItemRouter = express.Router();
const foodItemController = require("../controllers/foodItemController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// Define the endpoint to get all food items
foodItemRouter.get("/fooditems", foodItemController.getAllFoodItems);
//Define the endpoint to create a new food Item
foodItemRouter.post(
  "/createfooditem",
  verifyToken,
  isAdmin,
  foodItemController.createFoodItem
);
//Define the endpoint to update an existing food Item
foodItemRouter.put(
  "/updatefooditem/:id",
  verifyToken,
  isAdmin,
  foodItemController.updateFoodItem
);
//Define the endpoint to Delete an existing food Item
foodItemRouter.delete(
  "/deletefooditem/:id",
  verifyToken,
  isAdmin,
  foodItemController.deleteFoodItem
);

module.exports = foodItemRouter;
