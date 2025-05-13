const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

//display all categories
router.get('/', async(req , res) => {
    try{
        const categories = await Category.find()
        res.json(categories)
    }catch(error){
        res.status(500).json({message:'Unable to connect to server:',error})
    }
})

//add category
router.post('/', async(req , res)=>{
    try{
        const newCategory = new Category(req.body)
        await newCategory.save()
        res.status(201).json(newCategory)
    }catch(error){
        res.status(500).json({message:"Unable to connect to the server: ",error})
    }
})

module.exports = router