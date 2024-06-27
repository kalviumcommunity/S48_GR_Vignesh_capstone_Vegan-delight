const express = require("express");
const authController = require("../controllers/authcontroller");
const authRouter = express.Router();

// Define the endpoint to login a user
authRouter.post("/login", authController.loginUser);

// Define the endpoint to logout a user
authRouter.post("/logout", authController.logoutUser);

module.exports = authRouter;
