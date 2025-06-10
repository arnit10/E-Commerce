import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // get product id from url
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    brand: "",
    image: "",
    inStock: true,
    category: "",
    mrp: "",
    price: "",
    discount: "",
  });

  const [loading, setLoading] = useState(true);

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        alert("Failed to load product data");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      alert("Product updated successfully");
      navigate("/admin");
    } catch (error) {
      alert("Failed to update product");
    }
  };

  if (loading) return <div>Loading product data...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label>In Stock</label>
          <input
            type="checkbox"
            name="inStock"
            checked={product.inStock}
            onChange={handleChange}
            className="ml-2"
          />
        </div>

        <div>
          <label>Category ID</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <small className="text-gray-500">Enter category ObjectId</small>
        </div>

        <div>
          <label>MRP</label>
          <input
            type="number"
            name="mrp"
            value={product.mrp}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            min="0"
          />
        </div>

        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
            min="0"
          />
        </div>

        <div>
          <label>Discount</label>
          <input
            type="text"
            name="discount"
            value={product.discount || ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
