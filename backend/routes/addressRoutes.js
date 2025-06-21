const express = require("express");
const router = express.Router();
const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const verifyAdmin = require("../middleware/authMiddleware");

router
  .route("/")
  .get(verifyAdmin, getAddresses)
  .post(verifyAdmin, addAddress);

router
  .route("/:id")
  .put(verifyAdmin, updateAddress)
  .delete(verifyAdmin, deleteAddress);

module.exports = router;
