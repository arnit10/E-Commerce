import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

//hash password
adminSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

adminSchema.methods.comparePassword = function (enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.model("Admin", adminSchema)