const express = require("express");
const inventoryRouter = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// Define the endpoint to get all inventory items
inventoryRouter.get(
  "/inventory",
  verifyToken,
  isAdmin,
  inventoryController.getAllInventory
);
//Define the endpoint to create a item in inventory
inventoryRouter.post(
  "/addtoinventory",
  verifyToken,
  isAdmin,
  inventoryController.addToInventory
);
//Define the endpoint to update an entity in the inventory
inventoryRouter.put(
  "/updateinventory/:id",
  verifyToken,
  isAdmin,
  inventoryController.updateInventory
);
//Define the endpoint to Delete an existing entity in the inventory
inventoryRouter.delete(
  "/deleteinventory/:id",
  verifyToken,
  isAdmin,
  inventoryController.deleteInventory
);

module.exports = inventoryRouter;
