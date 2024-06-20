const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../controllers/employeeController");

// Define the endpoint to get all employees
employeeRouter.get("/employees", employeeController.getAllEmployees);
//Define the endpoint to create a new employee
employeeRouter.post("/createemployees", employeeController.createEmployee);

module.exports = employeeRouter;
