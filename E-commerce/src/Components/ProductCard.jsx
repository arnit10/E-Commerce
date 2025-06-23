import React from "react";
import {useNavigate} from "react-router-dom"
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const ProductCard = ({ product }) => {
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

  return (
    <div className="border rounded p-4 shadow hover:shadow-md transition">
      <div className="h-80 bg-gray-100 mb-2">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="text-lg font-medium">
        {product.title.length > 28 ? product.title.slice(0, 24) + "..." : product.title}
      </h3>
      <p className="text-gray-700">{product.brand}</p>
      <p className="line-through text-gray-500">₹{product.mrp}</p>
      <p >₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="mt-2 px-4 py-1 bg-black text-white rounded hover:bg-blue-500 active:scale-95"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
