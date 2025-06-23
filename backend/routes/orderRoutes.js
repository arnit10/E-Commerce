const express = require("express");
const { createOrder, getAllOrders, fulfillOrder, getUserOrders } = require("../controllers/orderController");

const verifyUser = require("../middleware/verifyUser")

const router = express.Router();

router.post("/", verifyUser, createOrder);
router.get("/my-orders", verifyUser, getUserOrders);

router.put("/:id/fulfill", fulfillOrder)
router.get("/", getAllOrders); // for admin



module.exports = router;
