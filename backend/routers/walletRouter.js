const express = require("express");
const walletRouter = express.Router();
const walletController = require("../controllers/walletController");

// Define the endpoint to get all wallets
walletRouter.get("/", walletController.getAllWallets);

module.exports = walletRouter;
