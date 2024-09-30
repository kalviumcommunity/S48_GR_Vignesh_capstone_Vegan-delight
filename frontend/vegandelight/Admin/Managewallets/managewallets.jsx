import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateWallet from "./updatewallet"; // Import the UpdateWallet component

const ManageWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingWalletId, setEditingWalletId] = useState(null);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/wallets");
        setWallets(response.data);
      } catch (error) {
        setError("Failed to load wallets. Please try again.");
        console.error("Error fetching wallets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallets();
  }, []);

  const handleUpdate = () => {
    // Refresh the list after updating a wallet
    const fetchWallets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/wallets");
        setWallets(response.data);
      } catch (error) {
        console.error("Error fetching wallets:", error);
      }
    };

    fetchWallets();
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
        {wallets.length > 0 ? (
          wallets.map((wallet) => (
            <div key={wallet._id} style={{ marginBottom: "20px" }}>
              <h3>Wallet ID: {wallet._id}</h3>
              <p>Balance: ₹{wallet.balance}</p>
              <button onClick={() => setEditingWalletId(wallet._id)}>
                Update
              </button>

              {/* Render UpdateWallet form next to the item if it's the one being edited */}
              {editingWalletId === wallet._id && (
                <UpdateWallet
                  walletId={wallet._id}
                  onClose={() => setEditingWalletId(null)}
                  onUpdate={handleUpdate}
                />
              )}
            </div>
          ))
        ) : (
          <p>No wallets available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageWallets;
