// pages/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },  
      });
      alert("Product deleted");
      fetchProducts(); // reload list
    } catch (err) {
      alert("Error deleting product");
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    alert("Login required as admin");
    navigate("/admin/login");
  } else {
    fetchProducts(); // only fetch if token exists
  }
}, []);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <button
        onClick={() => navigate("/admin/add-product")}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Add Product
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="h-40 object-contain w-full" />
            <h2 className="text-xl font-bold mt-2">{product.title}</h2>
            <p className="text-gray-700">₹{product.price}</p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => navigate(`/admin/edit-product/${product._id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
