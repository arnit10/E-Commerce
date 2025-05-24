const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || "secret"

exports.signup = async(req,res) =>{
    const {name, email, password} = req.body
    try{
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).json({message:"Email already exist"})
        
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name, email, password:hashedPassword})

        res.status(201).json({message:"User created succesfully"})
    }catch(err){
        res.status(500).json({message:'Signup error', error:err.message})
    }
}

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