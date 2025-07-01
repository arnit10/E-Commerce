const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Subcategory = require('../models/Subcategory');
const verifyAdmin  = require('../middleware/authMiddleware');

// ✅ Get subcategories (optionally filtered by categoryId)
router.get('/', async (req, res) => {
  try {
    const { categoryId } = req.query;

    let subcategories;
    if (categoryId) {
      subcategories = await Subcategory.find({ category: categoryId });
    } else {
      subcategories = await Subcategory.find();
    }

    res.json(subcategories);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching subcategories', error: err.message });
  }
});

router.post("/", verifyAdmin, async (req, res) => {
  try {
    const { name, category } = req.body;

    // 🔍 Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const newSubcategory = new Subcategory({ name, category });
    await newSubcategory.save();

    res.json(newSubcategory);
  } catch (err) {
    console.error("Add subcategory error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Subcategory already exists for this category" });
    }
    res.status(400).json({ message: err.message || "Bad Request" });
  }
});



// Delete subcategory
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await Subcategory.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Subcategory not found' });
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete subcategory', error: err.message });
  }
});

module.exports = router;
