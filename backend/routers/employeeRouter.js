const express = require("express");
const employeeRouter = express.Router();
const employeeController = require("../controllers/employeeController");

// Define the endpoint to get all employees
employeeRouter.get("/", employeeController.getAllEmployees);

module.exports = employeeRouter;
