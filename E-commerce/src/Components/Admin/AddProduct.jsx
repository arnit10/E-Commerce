import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    brand: '',
    inStock: true,
    category: '',
    subcategory: '',
    mrp: '',
    price: '',
    discount: '',
    images: []
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.log('Failed to fetch categories'));
  }, []);

  // Fetch subcategories
  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/subcategories?categoryId=${categoryId}`);
      setSubcategories(res.data);
    } catch (error) {
      console.error("Failed to fetch subcategories", error);
      setSubcategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setProduct({ ...product, images: files });
    } else {
      setProduct({
        ...product,
        [name]: type === 'checkbox' ? checked : value
      });
      if (name === "category") {
        fetchSubcategories(value);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();

      for (let key in product) {
        if (key === "images") {
          for (let i = 0; i < product.images.length; i++) {
            formData.append("images", product.images[i]);
          }
        } else {
          formData.append(key, product[key]);
        }
      }

      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("✅ Product added successfully!");
      setProduct({
        title: '',
        description: '',
        brand: '',
        inStock: true,
        category: '',
        subcategory: '',
        mrp: '',
        price: '',
        discount: '',
        images: []
      });

      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error("Error uploading product:", err);
      setMessage("❌ Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      {message && <p className="mb-4 text-center text-red-500">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} className="w-full p-2 border rounded" required />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleChange} className="w-full p-2 border rounded" required />

        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input type="text" name="mrp" placeholder="MRP" value={product.mrp} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="price" placeholder="Selling Price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="discount" placeholder="Discount %" value={product.discount} onChange={handleChange} className="w-full p-2 border rounded" />

        <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

        {product.category && (
          <select
            name="subcategory"
            value={product.subcategory}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Subcategory</option>
            {subcategories.map(sub => (
              <option key={sub._id} value={sub._id}>{sub.name}</option>
            ))}
          </select>
        )}

        <label className="flex items-center">
          <input type="checkbox" name="inStock" checked={product.inStock} onChange={handleChange} className="mr-2" />
          In Stock
        </label>

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
