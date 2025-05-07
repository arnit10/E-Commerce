import React from "react";

const dummyProducts = [
    { id: 1, title: "T-Shirt", price: "₹499" },
    { id: 2, title: "Smartphone", price: "₹12,999" },
    { id: 3, title: "Sneakers", price: "₹1,999" },
  ];
  
  const Products = () => {
    return (
      <section className="px-6 py-10 bg-white">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dummyProducts.map((product) => (
            <div key={product.id} className="border rounded p-4 shadow hover:shadow-md transition">
              <div className="h-40 bg-gray-100 mb-2"></div>
              <h3 className="text-lg font-medium">{product.title}</h3>
              <p className="text-gray-700">{product.price}</p>
              <button className="mt-2 px-4 py-1 bg-black text-white rounded">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Products;
  