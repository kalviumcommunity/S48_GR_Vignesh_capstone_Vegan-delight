const express = require("express");
const walletRouter = express.Router();
const walletController = require("../controllers/walletController");

// Define the endpoint to get all wallets
walletRouter.get("/wallets", walletController.getAllWallets);
//Define the endpoint to create a new employee
walletRouter.post("/createwallets", walletController.createWallet);
module.exports = walletRouter;
