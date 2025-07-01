import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const BASE_URL = "/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(BASE_URL);
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="px-6 py-10 bg-white">
      <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
