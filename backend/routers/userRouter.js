const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

// Define the endpoint to get all users
userRouter.get("/", userController.getAllUsers);

module.exports = userRouter;
