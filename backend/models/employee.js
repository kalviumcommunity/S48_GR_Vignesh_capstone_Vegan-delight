const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, required: true, enum: ["cooking", "cleaning"] },
  workDays: { type: [String], required: true },
  workShift: { type: String, required: true, enum: ["morning", "night"] },
  salary: { type: Number, required: true },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
