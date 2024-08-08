const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../controllers/employeeController");
//const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// Define the endpoint to get all employees
employeeRouter.get("/employees", employeeController.getAllEmployees);
//Define the endpoint to create a new employee
employeeRouter.post("/createemployees", employeeController.createEmployee);
//Define the endpoint to update an existing employee
employeeRouter.put("/updateemployee/:id", employeeController.updateEmployee);
//Define the endpoint to Delete an existing employee
employeeRouter.delete("/deleteemployee/:id", employeeController.deleteEmployee);

module.exports = employeeRouter;
