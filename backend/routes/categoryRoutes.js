const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const verifyAdmin = require('../middleware/verifyAdmin')

//display all categories
router.get('/', async(req , res) => {
    try{
        const categories = await Category.find()
        res.json(categories)
    }catch(error){
        res.status(500).json({message:'Unable to connect to server:',error})
    }
})

//add category (admin only access)
router.post('/', verifyAdmin, async(req , res)=>{
    try{
        const newCategory = new Category(req.body)
        await newCategory.save()
        res.status(201).json(newCategory)
    }catch(error){
        res.status(500).json({message:"Unable to connect to the server: ",error})
    }
})

//delete category (admin only access)
router.delete('/:id', verifyAdmin, async(req,res)=>{
    try{
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted" });
    }catch(error){
        res.status(500).json({ message: "Error deleting category", error });
    }
})

module.exports = router