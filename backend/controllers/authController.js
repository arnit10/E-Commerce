const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpStore = {};
const sendOTPEmail = require("../utils/sendOTPEmail");

const JWT_SECRET = process.env.JWT_SECRET || "secret"

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    otpStore[email] = { otp, expiresAt };
    await sendOTPEmail(email, otp); // uses nodemailer

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};


exports.signup = async (req, res) => {
  const { name, email, password, otp } = req.body;

  const record = otpStore[email];
  if (!record) return res.status(400).json({ message: "OTP not requested" });

  const isExpired = Date.now() > record.expiresAt;
  if (isExpired) return res.status(400).json({ message: "OTP expired" });

  if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    delete otpStore[email]; // ✅ ADDED: Clear OTP after use

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: 'Signup error', error: err.message });
  }
};


exports.login = async(req, res) =>{
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if (!user) return res.status(400).json({ message: 'Invalid credentials' })
        
        const isMatch = await bcrypt.compare(password , user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' })

        const token = jwt.sign({userId: user._id}, JWT_SECRET, { expiresIn: '7d' })
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } })

    }catch(err){
        res.status(500).json({ message: 'Login error', error: err.message })
    }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email createdAt');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
}

exports.deleteUser = async (req, res) => {
  try{
    const userId = req.params.id
    const deletedUser = await User.findByIdAndDelete(userId)

    if(!deletedUser){
      return res.status(404).json({message:"User not found"})
    }

    res.status(200).json({ message: 'User deleted successfully' })
  } catch(err) {
    console.error("Delete Error:", err)
    res.status(500).json({message:"Error deleting user!!", error: err.message})
  }
}

