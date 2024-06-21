const express = require("express");
const inventoryRouter = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Define the endpoint to get all inventory items
inventoryRouter.get("/inventory", inventoryController.getAllInventory);
//Define the endpoint to create a item in inventory
inventoryRouter.post("/addtoinventory", inventoryController.addToInventory);
//Define the endpoint to update an entity in the inventory
inventoryRouter.put(
  "/updateinventory/:id",
  inventoryController.updateInventory
);
//Define the endpoint to Delete an existing entity in the inventory
inventoryRouter.delete(
  "/deleteinventory/:id",
  inventoryController.deleteInventory
);

module.exports = inventoryRouter;
