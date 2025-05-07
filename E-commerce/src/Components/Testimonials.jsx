import React from "react";

const Testimonials = () => {
    return (
      <section className="px-6 py-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <blockquote className="p-4 bg-white rounded shadow">
            “Amazing quality and fast delivery!” – Ayesha
          </blockquote>
          <blockquote className="p-4 bg-white rounded shadow">
            “I love the variety of products here.” – Rahul
          </blockquote>
          <blockquote className="p-4 bg-white rounded shadow">
            “Customer service is top-notch.” – Priya
          </blockquote>
        </div>
      </section>
    );
  };
  
  export default Testimonials;
  