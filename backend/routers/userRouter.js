const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

// Define the endpoint to get all users
userRouter.get("/users", userController.getAllUsers);
//Define the endpoint to create a new user
userRouter.post("/createuser", userController.createUser);
//Define the endpoint to update an existing user
userRouter.put("/updateuser/:id", userController.updateUser);
//Define the endpoint to Delete an existing user
userRouter.delete("/deleteuser/:id", userController.deleteUser);

module.exports = userRouter;
