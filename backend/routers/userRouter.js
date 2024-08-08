const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
//const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// Define the endpoint to get all users
userRouter.get("/users", userController.getAllUsers);
//Define the endpoint to create a new user
userRouter.post("/register", userController.createUser);
//Define the endpoint to get user by ID
userRouter.get("/users/:id", userController.getUserById);
//Define the endpoint to update an existing user
userRouter.put("/updateuser/:id", userController.updateUser);
//Define the endpoint to Delete an existing user
userRouter.delete("/deleteuser/:id", userController.deleteUser);

module.exports = userRouter;
