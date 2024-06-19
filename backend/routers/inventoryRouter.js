const express = require("express");
const inventoryRouter = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Define the endpoint to get all inventory items
inventoryRouter.get("/", inventoryController.getAllInventory);

module.exports = inventoryRouter;
