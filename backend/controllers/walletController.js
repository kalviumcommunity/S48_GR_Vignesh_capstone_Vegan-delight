const Wallet = require("../models/Wallet");

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

module.exports = {
  getAllWallets,
  createWallet,
};
