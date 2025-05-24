const express = require('express')
const router = express.Router()
const Subcategory = require('../models/Subcategory')

//get all subcategory
router.get('/', async (req , res)=> {
    try{
        const subcategories = await Subcategory.find()
        res.json(subcategories)
    }
    catch(err){
        res.status(400).json({message:'error: ',err})
    }
})

//add subcategory
router.post('/', async (req,res)=>{
    try{
        const newSubcategory = new Subcategory(req.body)
        await newSubcategory.save()
        res.json(newSubcategory)
    }catch(err){
        res.status(400).json({message:"error: ",err})
    }
})



module.exports = router
