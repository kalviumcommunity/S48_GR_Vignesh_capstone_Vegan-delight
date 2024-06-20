const Employee = require("../models/Employee");

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const { name, age, role, workDays, workShift, salary } = req.body;
    const newEmployee = new Employee({
      name,
      age,
      role,
      workDays,
      workShift,
      salary,
    });

    const employee = await newEmployee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
};
