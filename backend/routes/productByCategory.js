const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const Category = require('../models/Category')

//Get products by category
router.get('/:name', async (req, res) =>{
    try{
        const categoryName = req.params.name
        const category = await Category.findOne({ name: categoryName })

        if (!category) {
        return res.status(404).json({ message: 'Category not found' })
        }
        const products = await Product.find({ category: category._id })
        res.json(products)
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router