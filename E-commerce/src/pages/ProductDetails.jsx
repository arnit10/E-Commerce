import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Products from '../Components/Products';
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleAddToCart = () => {
    const token = localStorage.getItem('token')
    if(!token){
      navigate("/login")
      return
    }
    dispatch(addToCart(product));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!product) return <p className="text-center mt-10 text-red-500">Product not found</p>;

  return (
    <>
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <img src={product.image} alt={product.title} className="rounded-lg w-full object-cover h-96" />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p><strong>Category:</strong> {product.category?.name || 'N/A'}</p>
        <p><strong>MRP:</strong> ₹{product.mrp}</p>
        <p className="text-green-600 font-semibold"><strong>Price:</strong> ₹{product.price}</p>
        <p className="text-red-500"><strong>Discount:</strong> {product.discount || '0%'}% off</p>
        <p><strong>Status:</strong> {product.inStock ? 'In Stock ✅' : 'Out of Stock ❌'}</p>
        <button
        onClick={handleAddToCart}
        className="mt-2 px-4 py-1 bg-black text-white rounded hover:bg-blue-500 active:scale-95"
      >
        Add to Cart
      </button>
      </div>
      
    </div>
    <Products/>
    </>
  );
};

export default ProductDetails;
