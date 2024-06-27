const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../controllers/employeeController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// Define the endpoint to get all employees
employeeRouter.get(
  "/employees",
  verifyToken,
  isAdmin,
  employeeController.getAllEmployees
);
//Define the endpoint to create a new employee
employeeRouter.post(
  "/createemployees",
  verifyToken,
  isAdmin,
  employeeController.createEmployee
);
//Define the endpoint to update an existing employee
employeeRouter.put(
  "/updateemployee/:id",
  verifyToken,
  isAdmin,
  employeeController.updateEmployee
);
//Define the endpoint to Delete an existing employee
employeeRouter.delete(
  "/deleteemployee/:id",
  verifyToken,
  isAdmin,
  employeeController.deleteEmployee
);

module.exports = employeeRouter;
