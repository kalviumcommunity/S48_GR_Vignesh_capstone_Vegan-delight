const Employee = require("../models/employee");

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

// Update an existing employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, age, role, workDays, workShift, salary } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      { name, age, role, workDays, workShift, salary },
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete an employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return res.status(404).json({ msg: "Employee not found" });
    }

    res.status(200).json({ msg: "Employee deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
