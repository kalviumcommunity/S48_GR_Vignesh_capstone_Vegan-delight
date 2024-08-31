import React, { useState } from "react";
import axios from "axios";

const CreateEmployee = ({ onCreate }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    age: "",
    role: "",
    workDays: "",
    workShift: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/createemployees", newEmployee);
      onCreate();
      setNewEmployee({
        name: "",
        age: "",
        role: "",
        workDays: "",
        workShift: "",
        salary: "",
      });
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Create New Employee</h3>
      <input
        type="text"
        name="name"
        value={newEmployee.name}
        onChange={handleInputChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="age"
        value={newEmployee.age}
        onChange={handleInputChange}
        placeholder="Age"
        required
      />
      <input
        type="text"
        name="role"
        value={newEmployee.role}
        onChange={handleInputChange}
        placeholder="Role"
        required
      />
      <input
        type="text"
        name="workDays"
        value={newEmployee.workDays}
        onChange={handleInputChange}
        placeholder="Work Days"
        required
      />
      <input
        type="text"
        name="workShift"
        value={newEmployee.workShift}
        onChange={handleInputChange}
        placeholder="Work Shift"
        required
      />
      <input
        type="number"
        name="salary"
        value={newEmployee.salary}
        onChange={handleInputChange}
        placeholder="Salary"
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default CreateEmployee;
