const express = require("express");
const foodItemRouter = express.Router();
const foodItemController = require("../controllers/foodItemController");

// Define the endpoint to get all food items
foodItemRouter.get("/", foodItemController.getAllFoodItems);

module.exports = foodItemRouter;
