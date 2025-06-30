const express = require('express')
const router = express.Router()
const {signup, login, getAllUsers, deleteUser, sendOtp} = require('../controllers/authController')

router.post("/send-otp", sendOtp);
router.post('/signup', signup)
router.post('/login', login)

//admin access only
router.get('/users', getAllUsers)
router.delete('/users/:id', deleteUser)

module.exports = router