import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    brand: '',
    image: '',
    inStock: true,
    category: '',
    mrp: '',
    price: '',
    discount: ''
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch categories for dropdown
  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.log('Failed to fetch categories'));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/products', product);
      setMessage('✅ Product added successfully!');
      setProduct({
        title: '', description: '', brand: '', image: '', inStock: true,
        category: '', mrp: '', price: '', discount: ''
      });
    } catch (err) {
      setMessage('❌ Failed to add product');
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
        <input type="text" name="image" placeholder="Image URL" value={product.image} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="mrp" placeholder="MRP" value={product.mrp} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="price" placeholder="Selling Price" value={product.price} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="discount" placeholder="Discount %" value={product.discount} onChange={handleChange} className="w-full p-2 border rounded" />
        
        <select name="category" value={product.category} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>

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
