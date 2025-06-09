import React from "react";
import { useNavigate } from "react-router-dom";

const ThankYou = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/')
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Your order has been placed successfully. We appreciate your purchase.
        </p>
        <button
          onClick={handleBackToHome}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-lg transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
