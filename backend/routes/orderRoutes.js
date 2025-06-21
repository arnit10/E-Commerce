const express = require("express");
const { createOrder, getAllOrders, fulfillOrder } = require("../controllers/orderController");

const router = express.Router();

router.post("/", createOrder);
router.put("/:id/fulfill", fulfillOrder)

router.get("/", getAllOrders); // for admin

module.exports = router;
