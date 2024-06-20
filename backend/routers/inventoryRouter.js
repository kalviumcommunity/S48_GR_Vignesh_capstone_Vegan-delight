const express = require("express");
const inventoryRouter = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Define the endpoint to get all inventory items
inventoryRouter.get("/inventory", inventoryController.getAllInventory);
//Define the endpoint to create a item in inventory
inventoryRouter.post("/addtoinventory", inventoryController.addToInventory);
module.exports = inventoryRouter;
