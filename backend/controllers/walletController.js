const Wallet = require("../models/wallet");

// Get all wallets
const getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find();
    res.status(200).json(wallets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Create a new wallet
const createWallet = async (req, res) => {
  try {
    const { userId, balance } = req.body;
    const newWallet = new Wallet({
      userId,
      balance,
    });

    const wallet = await newWallet.save();
    res.status(201).json(wallet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
// Update an existing wallet
const updateWallet = async (req, res) => {
  const { id } = req.params;
  const { userId, balance } = req.body;

  try {
    const wallet = await Wallet.findByIdAndUpdate(
      id,
      { userId, balance },
      { new: true, runValidators: true }
    );

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }

    res.status(200).json(wallet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a wallet
const deleteWallet = async (req, res) => {
  const { id } = req.params;

  try {
    const wallet = await Wallet.findByIdAndDelete(id);

    if (!wallet) {
      return res.status(404).json({ msg: "Wallet not found" });
    }

    res.status(200).json({ msg: "Wallet deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllWallets,
  createWallet,
  updateWallet,
  deleteWallet,
};
