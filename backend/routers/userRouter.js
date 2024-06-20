const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

// Define the endpoint to get all users
userRouter.get("/users", userController.getAllUsers);
//Define the endpoint to create a new employee
userRouter.post("/createuser", userController.createUser);
module.exports = userRouter;
