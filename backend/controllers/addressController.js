const Address = require("../models/Address");

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.userId });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching addresses", error: err.message });
  }
};

const addAddress = async (req, res) => {
  try {
    const { name, street, city, state, zip, phone } = req.body;
    const address = new Address({
      user: req.user.userId,
      name,
      street,
      city,
      state,
      zip,
      phone,
    });

    await address.save();
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: "Error adding address", error: err.message });
  }
};

const updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (address.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized: Cannot edit this address" });
    }

    Object.assign(address, req.body);
    await address.save();
    res.status(200).json({ message: "Address updated", address });
  } catch (err) {
    res.status(500).json({ message: "Error updating address", error: err.message });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (address.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized: Cannot delete this address" });
    }

    await address.deleteOne();
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting address", error: err.message });
  }
};

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
