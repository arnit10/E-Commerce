const Address = require("../models/Address");

const getAddresses = async (req, res) => {
  const addresses = await Address.find({ user: req.user._id });
  res.json(addresses);
};

const addAddress = async (req, res) => {
  const { name, street, city, state, zip, phone } = req.body;
  const address = new Address({
    user: req.user._id,
    name, street, city, state, zip, phone,
  });
  await address.save();
  res.status(201).json(address);
};

const updateAddress = async (req, res) => {
  const address = await Address.findById(req.params.id);
  if (!address) return res.status(404).json({ message: "Address not found" });
  if (address.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  Object.assign(address, req.body);
  await address.save();
  res.json(address);
};

const deleteAddress = async (req, res) => {
  const address = await Address.findById(req.params.id);
  if (!address) return res.status(404).json({ message: "Address not found" });
  if (address.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await address.remove();
  res.json({ message: "Address deleted" });
};

module.exports = {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
};
