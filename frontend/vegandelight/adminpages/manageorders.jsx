import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateOrder from "../admincomponents/updateorder"; // Import the UpdateOrder component

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/orders");
        setOrders(response.data);
      } catch (error) {
        setError("Failed to load orders. Please try again.");
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/orders/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      setError("Failed to delete order. Please try again.");
      console.error("Error deleting order:", error);
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
      <div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} style={{ marginBottom: "20px" }}>
              <h3>Order ID: {order._id}</h3>
              <p>Status: {order.status}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <button onClick={() => setEditingOrderId(order._id)}>
                Update
              </button>
              <button onClick={() => handleDeleteClick(order._id)}>
                Delete
              </button>

              {/* Render UpdateOrder form next to the item if it's the one being edited */}
              {editingOrderId === order._id && (
                <UpdateOrder
                  orderId={order._id}
                  onClose={() => setEditingOrderId(null)}
                  onUpdate={() => {
                    // Refresh the list after update
                    const fetchOrders = async () => {
                      try {
                        const response = await axios.get(
                          "http://localhost:3000/orders"
                        );
                        setOrders(response.data);
                      } catch (error) {
                        console.error("Error fetching orders:", error);
                      }
                    };

                    fetchOrders();
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
