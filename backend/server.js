import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import categoryRoutes from './routes/categoryRoutes.js';
import productByCategoryRoutes from './routes/productByCategory.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import subCategoryRoutes from './routes/subCategoryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import addressRoutes from './routes/addressRoutes.js'

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productByCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subcategories', subCategoryRoutes);
// app.use('/api/users', authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes)



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running...");
    });
  })
  .catch(err => console.error("DB connection error:", err));
