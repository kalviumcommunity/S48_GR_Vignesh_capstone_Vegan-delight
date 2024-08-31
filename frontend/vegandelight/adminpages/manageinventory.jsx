import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateInventory from "../admincomponents/updateinventory";

const ManageInventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingInventoryId, setEditingInventoryId] = useState(null);

  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/inventory");
        setInventoryItems(response.data);
      } catch (error) {
        setError("Failed to load inventory items. Please try again.");
        console.error("Error fetching inventory items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryItems();
  }, []);

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteinventory/${id}`);
      setInventoryItems(inventoryItems.filter((item) => item._id !== id));
    } catch (error) {
      setError("Failed to delete inventory item. Please try again.");
      console.error("Error deleting inventory item:", error);
    }
  };

  const handleUpdate = () => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/inventory");
        setInventoryItems(response.data);
      } catch (error) {
        console.error("Error fetching inventory items:", error);
      }
    };

    fetchInventoryItems();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Manage Inventory</h2>
      <div>
        {inventoryItems.length > 0 ? (
          inventoryItems.map((item) => (
            <div key={item._id} style={{ marginBottom: "20px" }}>
              <h3>{item.item}</h3>
              <p>Supplier: {item.supplier}</p>
              <p>Rate: ₹{item.rate}</p>
              <p>Contact: {item.contact}</p>
              <p>
                Last Ordered: {new Date(item.lastordered).toLocaleDateString()}
              </p>
              <button onClick={() => setEditingInventoryId(item._id)}>
                Update
              </button>
              <button onClick={() => handleDeleteClick(item._id)}>
                Delete
              </button>

              {editingInventoryId === item._id && (
                <UpdateInventory
                  itemId={item._id}
                  onClose={() => setEditingInventoryId(null)}
                  onUpdate={handleUpdate}
                />
              )}
            </div>
          ))
        ) : (
          <p>No inventory items available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageInventory;
