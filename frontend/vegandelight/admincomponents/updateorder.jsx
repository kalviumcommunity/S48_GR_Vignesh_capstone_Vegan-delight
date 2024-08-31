import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateOrder = ({ orderId, onClose, onUpdate }) => {
  const [orderDetails, setOrderDetails] = useState({
    totalAmount: "",
    status: "",
  });

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/${orderId}`
        );
        setOrderDetails({
          totalAmount: response.data.totalAmount,
          status: response.data.status,
        });
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/updateorder/${orderId}`,
        orderDetails
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  return (
    <div>
      <h3>Update Order</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Total Amount:</label>
          <input
            type="number"
            name="totalAmount"
            value={orderDetails.totalAmount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Status:</label>
          <input
            type="text"
            name="status"
            value={orderDetails.status}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateOrder;
