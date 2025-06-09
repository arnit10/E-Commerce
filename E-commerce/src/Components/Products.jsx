// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {useDispatch} from 'react-redux'
// import { addToCart } from "../features/cart/cartSlice";


// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const BASE_URL = "http://localhost:5000/api/products";
  
//   const dispatch = useDispatch()

//   const handleAddToCart = (product) => {
//     dispatch(addToCart(product));
    
//   }

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(BASE_URL);
//         setProducts(res.data);
//       } catch (error) {
//         console.error("Failed to fetch products:", error.message);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <section className="px-6 py-10 bg-white">
//       <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div key={product._id} className="border rounded p-4 shadow hover:shadow-md transition">
//             <div className="h-80 bg-gray-100 mb-2 ">
//               <img
//                 src={product.image}
//                 alt={product.title}
//                 className="h-full w-full object-cover"
//               />
//             </div>
//             <h3 className="text-lg font-medium">{product.title.slice(0,28)}...</h3>
//             <p className="text-gray-700">{product.brand}</p>
//             <p>₹{product.price}</p>
//             <button 
//             onClick={()=>handleAddToCart(product)}
//             className="mt-2 px-4 py-1 bg-black text-white rounded">Add to Cart</button>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const BASE_URL = "http://localhost:5000/api/products";

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
