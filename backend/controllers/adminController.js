import Admin from "../models/Admin.js";
import jwt from 'jsonwebtoken'

export const loginAdmin = async (req, res) =>{
    const {email, password} = req.body
    try{
        const admin = await Admin.findOne({email})
        if (!admin) return res.status(400).json({ message: "Admin not found" })

        const isMatch = await admin.comparePassword(password)
        if (!isMatch) return res.status(401).json({ message: "Invalid password" })
        
        const token = jwt.sign({ id: admin._id }, "your_secret", { expiresIn: "7d" })

        res.json({ token, email: admin.email })
    }catch(err){
        res.status(500).json({ message: "Server error" })
    }
}