const express = require("express");
const walletRouter = express.Router();
const walletController = require("../controllers/walletController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// Define the endpoint to get all wallets
walletRouter.get("/wallets", walletController.getAllWallets);
//Define the endpoint to create a new wallet
walletRouter.post("/createwallets", walletController.createWallet);
//Define the endpoint to update an existing wallet
walletRouter.put("/updatewallet/:id", walletController.updateWallet);
//Define the endpoint to delete an existing wallet
walletRouter.delete("/deletewallet/:id", walletController.deleteWallet);

module.exports = walletRouter;
