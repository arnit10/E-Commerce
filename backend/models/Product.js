const mongoose = require('mongoose')
const Category = require('./Category')

//product schema
const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    inStock:{
        type: Boolean,
        default:true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price:{
        type: String,
        required:true,
        default: 0
    }
},{timestamps: true})

module.exports = mongoose.model('Product', productSchema)