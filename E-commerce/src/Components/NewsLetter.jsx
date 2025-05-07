import React from "react";

const Newsletter = () => {
    return (
      <section className="px-6 py-10 text-center bg-white">
        <h2 className="text-2xl font-semibold mb-2">Subscribe to Our Newsletter</h2>
        <p className="mb-4 text-gray-600">Get exclusive offers and updates in your inbox</p>
        <div className="flex justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-4 py-2 rounded w-64"
          />
          <button className="bg-black text-white px-4 py-2 rounded">Subscribe</button>
        </div>
      </section>
    );
  };
  
  export default Newsletter;
  