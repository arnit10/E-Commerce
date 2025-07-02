import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "../utils/axios";
import ProductCard from '../Components/ProductCard';

const ProductListByCategory = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        const res = await axios.get(`/api/products/category/${encodeURIComponent(name)}`); 

        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching data by category", err);
      }
    };

    fetchByCategory();
  }, [name]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📦 {name} Products</h2>
      {products.length === 0 ? (
        <p>No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListByCategory;
