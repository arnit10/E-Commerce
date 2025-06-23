import React, { useEffect, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"
import { useSelector } from "react-redux"

const UserOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state) => state.auth)
  const token = localStorage.getItem("token")

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setOrders(res.data)
    } catch (error) {
      console.error("Error fetching user orders:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserOrders()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading your orders...</p>

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">You haven't placed any orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 shadow rounded-xl">
              <h3 className="text-xl font-semibold">Order ID: {order._id}</h3>
              <p className="text-sm text-gray-700 font-bold mt-2">Total: ₹{order.totalAmount}</p>
              <p className="text-sm text-gray-700">Ordered At: {dayjs(order.orderedAt).format("DD MMM YYYY hh:mm A")}</p>

              {order.shippingAddress && (
                <>
                  <p className="underline font-semibold mt-3">Shipping Address:</p>
                  <div className="text-sm text-gray-700 font-bold mt-2 space-y-1">
                    <p>Name: {order.shippingAddress.name}</p>
                    <p>Street: {order.shippingAddress.street}</p>
                    <p>City: {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}</p>
                    <p>📞 {order.shippingAddress.phone}</p>
                  </div>
                </>
              )}

              <p className={`mt-2 font-semibold ${order.fulfilled ? 'text-green-600' : 'text-orange-500'}`}>
                Status: {order.fulfilled ? `Fulfilled on ${dayjs(order.fulfilledAt).format("DD MMM YYYY hh:mm A")}` : "Pending"}
              </p>

              <div className="mt-4">
                <p className="font-semibold">Items:</p>
                <ul className="list-disc ml-6">
                  {order.cartItems.map((item, idx) => (
                    <li key={idx}>
                      {item.title} × {item.quantity} (₹{item.price})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserOrders