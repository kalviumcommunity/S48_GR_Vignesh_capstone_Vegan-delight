import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateEmployee = ({ employeeId, onClose, onUpdate }) => {
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    role: "",
    workDays: "",
    workShift: "",
    salary: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/employees/${employeeId}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleInputChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/updateemployee/${employeeId}`,
        employee
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Update Employee</h3>
      <input
        type="text"
        name="name"
        value={employee.name}
        onChange={handleInputChange}
        placeholder={employee.name}
      />
      <input
        type="number"
        name="age"
        value={employee.age}
        onChange={handleInputChange}
        placeholder={employee.age}
      />
      <input
        type="text"
        name="role"
        value={employee.role}
        onChange={handleInputChange}
        placeholder={employee.role}
      />
      <input
        type="text"
        name="workDays"
        value={employee.workDays}
        onChange={handleInputChange}
        placeholder={employee.workDays}
      />
      <input
        type="text"
        name="workShift"
        value={employee.workShift}
        onChange={handleInputChange}
        placeholder={employee.workShift}
      />
      <input
        type="number"
        name="salary"
        value={employee.salary}
        onChange={handleInputChange}
        placeholder={employee.salary}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default UpdateEmployee;
