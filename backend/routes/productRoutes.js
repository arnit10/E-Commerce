const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const verifyAdmin = require('../middleware/authMiddleware')
const multer = require('multer');
const path = require('path');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

//fetch all data
router.get('/', async(req , res)=>{
    try{
        const products = await Product.find()
        .populate('category')
        .sort({createdAt: -1})
        res.json(products)
    }catch(error){
        res.status(500).json({message:"Error: ",error})
    }
})

//
// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category')
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add product (admin only)
router.post('/', verifyAdmin, upload.array('images', 5), async (req, res) => {
  try {
    const {
      title, description, brand, price, mrp, discount,
      category, subcategory, inStock
    } = req.body;
    const imagePaths = req.files.map((file) => `/uploads/${file.filename}`);

    const newProduct = new Product({
      title,
      description,
      brand,
      price,
      mrp,
      discount,
      category,
      subcategory,
      inStock,
      images: imagePaths, // <-- store image paths in array
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit product (admin only)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete product (admin only)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});


module.exports = router