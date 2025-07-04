import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const adminToken = localStorage.getItem("adminToken");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase();
    return (
      order._id.toLowerCase().includes(query) ||
      order.userId?.email?.toLowerCase().includes(query) ||
      dayjs(order.orderedAt).format("DD MMM YYYY hh:mm A").toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const markAsFulfilled = async (orderId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/fulfill`,
        {},
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("Error fulfilling order:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;

  return (
    <div className="p-10">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Order ID, Email, or Date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded shadow-sm focus:outline-none focus:ring"
        />
      </div>

      <h2 className="text-4xl font-bold mb-6 text-center">All Orders</h2>
      {filteredOrders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white p-6 shadow rounded-xl">
              <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
              <p className="text-sm text-gray-700">User: {order.userId?.name}</p>
              <p className="text-sm text-gray-700">Email: {order.userId?.email}</p>
              <p className="text-sm text-gray-700 font-bold mt-2">Total: ₹{order.totalAmount}</p>
              <p className="text-sm text-gray-700">Ordered At: {dayjs(order.orderedAt).format("DD MMM YYYY hh:mm A")}</p>

              {order.shippingAddress && (
                <>
                  <p className="underline font-semibold mt-3">Shipping Address:</p>
                  <div className="text-sm text-gray-700 font-bold mt-2 space-y-1">
                    <p>Name: {order.shippingAddress.name}</p>
                    <p>Address Line 1: {order.shippingAddress.street}</p>
                    <p>
                      City: {order.shippingAddress.city}, State: {order.shippingAddress.state} - Pincode{" "}
                      {order.shippingAddress.zip}
                    </p>
                    <p>📞 {order.shippingAddress.phone}</p>
                  </div>
                </>
              )}

              {order.fulfilled ? (
                <p className="text-green-600 font-semibold mt-2">
                  Fulfilled on: {dayjs(order.fulfilledAt).format("DD MMM YYYY hh:mm A")}
                </p>
              ) : (
                <button
                  onClick={() => markAsFulfilled(order._id)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Mark as Fulfilled
                </button>
              )}

              <div className="mt-4">
                <p className="font-semibold">Items:</p>
                <ul className="list-disc ml-6">
                  {order.cartItems.map((item, idx) => (
                    <li key={idx}>
                      {item.title} x {item.quantity} (₹{item.price})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;