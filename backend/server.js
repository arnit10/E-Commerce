const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const categoryRoutes = require('./routes/categoryRoutes');
const productByCategoryRoutes = require('./routes/productByCategory');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const subCategoryRoutes = require('./routes/subCategoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const addressRoutes = require('./routes/addressRoutes');
const contactRoutes = require('./routes/contact');

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173','https://e-commerce-gamma-bice-64.vercel.app/'],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("API is running");
});


app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productByCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/addresses", addressRoutes)
app.use("/api/contact", contactRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running...");
    });
  })
  .catch(err => console.error("DB connection error:", err));
