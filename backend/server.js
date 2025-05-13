const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')

app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT || 5000 , ()=>{
            console.log("Server is running...")
        })
    })
    .catch(err => console.error("DB connection error :" , err))

