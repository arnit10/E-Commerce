const mongoose = require('mongoose')

//subcategory schema
const SubcategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
},{timestamps:true})

SubcategorySchema.index({ name: 1, category: 1 }, { unique: true })

module.exports = mongoose.model('Subcategory', SubcategorySchema)
