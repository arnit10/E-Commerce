const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

//fetch all data
router.get('/', async(req , res)=>{
    try{
        const products = await Product.find().populate('category')
        res.json(products)
    }catch(error){
        res.status(500).json({message:"Error: ",error})
    }
})

//add product
router.post('/', async(req , res)=>{
    try{
        const newProduct = new Product(req.body)
        await newProduct.save()
        res.status(201).json(newProduct)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//update product


module.exports = router