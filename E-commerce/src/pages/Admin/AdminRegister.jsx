import React, { useState } from 'react';
import axios from "../../utils/axios"

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post('/api/admin/register', {
        email,
        password,
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Register</h2>

        {msg && <p className="mb-4 text-center text-sm text-red-500">{msg}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
