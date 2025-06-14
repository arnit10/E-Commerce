import express from 'express';
import Admin from '../models/Admin.js';
import { loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const newAdmin = new Admin({ email, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
