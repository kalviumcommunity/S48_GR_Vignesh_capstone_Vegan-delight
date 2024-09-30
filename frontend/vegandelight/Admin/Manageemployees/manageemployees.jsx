import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateEmployee from "./createemployee"; // Import the CreateEmployee component
import UpdateEmployee from "./updateemployee"; // Import the UpdateEmployee component

const ManageEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        setEmployees(response.data);
      } catch (error) {
        setError("Failed to load employees. Please try again.");
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleCreate = () => {
    // Refetch employees after creating a new one
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteemployee/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
    } catch (error) {
      setError("Failed to delete employee. Please try again.");
      console.error("Error deleting employee:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <CreateEmployee onCreate={handleCreate} />
      <div>
        {employees.length > 0 ? (
          employees.map((employee) => (
            <div key={employee._id} style={{ marginBottom: "20px" }}>
              <h3>{employee.name}</h3>
              <p>Age: {employee.age}</p>
              <p>Role: {employee.role}</p>
              <p>Work Days: {employee.workDays}</p>
              <p>Work Shift: {employee.workShift}</p>
              <p>Salary: ₹{employee.salary}</p>
              <button onClick={() => setEditingEmployeeId(employee._id)}>
                Update
              </button>
              <button onClick={() => handleDeleteClick(employee._id)}>
                Delete
              </button>

              {/* Render UpdateEmployee form next to the item if it's the one being edited */}
              {editingEmployeeId === employee._id && (
                <UpdateEmployee
                  employeeId={employee._id}
                  onClose={() => setEditingEmployeeId(null)}
                  onUpdate={handleCreate}
                />
              )}
            </div>
          ))
        ) : (
          <p>No employees available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageEmployees;
