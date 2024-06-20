const express = require("express");
const foodItemRouter = express.Router();
const foodItemController = require("../controllers/foodItemController");

// Define the endpoint to get all food items
foodItemRouter.get("/fooditems", foodItemController.getAllFoodItems);
//Define the endpoint to create a new food Item
foodItemRouter.post("/createfooditem", foodItemController.createFoodItem);

module.exports = foodItemRouter;
