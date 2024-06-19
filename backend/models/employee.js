const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, required: true },
    workDays: { type: [String], required: true },
    workShift: { type: String, required: true },
    salary: { type: Number, required: true },
  },
  { collection: "employees" }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
