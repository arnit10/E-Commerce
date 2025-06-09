const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
app.use(express.json())

const categoryRoutes = require('./routes/categoryRoutes')
const productByCategoryRoutes = require('./routes/productByCategory');
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')

app.use('/api/categories', categoryRoutes)
app.use('/api/products', productByCategoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT || 5000 , ()=>{
            console.log("Server is running...")
        })
    })
    .catch(err => console.error("DB connection error :" , err))

