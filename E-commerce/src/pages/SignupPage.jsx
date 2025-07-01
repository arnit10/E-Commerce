import React, { useState } from 'react';
import axios from "../utils/axios";
import { Link, useNavigate } from 'react-router-dom';


const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sendOtp = async () => {
    if (!email) return alert("Please enter your email first");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/send-otp", {
        email,
      });
      alert(res.data.message);
      setOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !otp) {
      alert("Please fill all fields including OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
        otp,
      });
      alert(res.data.message || "User registered successfully!");
      navigate('/login')
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 min-h-screen flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-center text-4xl pb-8">Signup</h1>
        <div className="flex flex-col gap-6 items-center justify-center">
          <input
            type="text"
            placeholder="name"
            className="w-80 p-2 border border-gray-300 rounded"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            className="w-80 p-2 border border-gray-300 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded w-80"
            onClick={sendOtp}
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-80 p-2 border border-gray-300 rounded"
                onChange={(e) => setOtp(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="w-80 p-2 border border-gray-300 rounded"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-gray-800 text-white p-2 rounded w-40 hover:bg-gray-600"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Registering..." : "Signup"}
              </button>
            </>
          )}

          <p>
            Already a user?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
