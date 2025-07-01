import React, { useState, useEffect } from "react";
import axios from "../utils/axios"

const Address = ({ onSelect, isCheckout = false }) => {
  const token = localStorage.getItem("token")
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("/api/addresses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `/${editingId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post("/api/addresses", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      setFormData({
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        phone: "",
      });
      setEditingId(null);
      fetchAddresses();
    } catch (err) {
      console.error("Error saving address", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this address?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address", err);
    }
  };

  const handleEdit = (address) => {
    setFormData(address);
    setEditingId(address._id);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Addresses</h2>

      {addresses.map((addr) => (
        <div
          key={addr._id}
          className="border p-4 mb-4 rounded shadow flex justify-between items-start"
        >
          <div>
            <p><strong>{addr.name}</strong></p>
            <p>{addr.street}, {addr.city}, {addr.state} - {addr.zip}</p>
            <p>📞 {addr.phone}</p>
          </div>
          <div className="space-x-2">
            {isCheckout && (
              <button
                onClick={() => onSelect(addr)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Select
              </button>
            )}
            <button
              onClick={() => handleEdit(addr)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(addr._id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <h3 className="text-xl font-semibold mt-6 mb-2">
        {editingId ? "Edit Address" : "Add New Address"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "street", "city", "state", "zip", "phone"].map((field) => (
          <input
            key={field}
            type="text"
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="block w-full p-2 border rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add Address"}
        </button>
      </form>
    </div>
  );
};

export default Address;
