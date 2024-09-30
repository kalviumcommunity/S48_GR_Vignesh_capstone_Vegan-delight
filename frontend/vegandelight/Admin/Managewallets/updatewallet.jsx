import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateWallet = ({ walletId, onClose, onUpdate }) => {
  const [walletDetails, setWalletDetails] = useState({
    balance: "",
  });

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/wallets/${walletId}`
        );
        setWalletDetails({
          balance: response.data.balance,
        });
      } catch (error) {
        console.error("Failed to fetch wallet details:", error);
      }
    };

    fetchWalletDetails();
  }, [walletId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWalletDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/updatewallet/${walletId}`,
        walletDetails
      );
      onUpdate();
      onClose();
    } catch (error) {
      console.error("Failed to update wallet:", error);
    }
  };

  return (
    <div className="adminforms">
      <h3>Update Wallet</h3>
      <form onSubmit={handleFormSubmit} className="adminforms">
        <div>
          <label>Balance:</label>
          <input
            type="number"
            name="balance"
            value={walletDetails.balance}
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

export default UpdateWallet;
