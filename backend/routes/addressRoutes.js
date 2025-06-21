const express = require("express");
const router = express.Router();
const {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controllers/addressController");

const verifyAdmin = require("../middleware/authMiddleware");
const verifyUser = require("../middleware/verifyUser")

router
  .route("/")
  .get(verifyUser, getAddresses)
  .post(verifyUser, addAddress);

router
  .route("/:id")
  .put(verifyUser, updateAddress)
  .delete(verifyUser, deleteAddress);

module.exports = router;
