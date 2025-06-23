const Contact = require('../models/Contact')

//post || new contact
const createContact = async (req, res) =>{
    try{
        const {name, email, message} = req.body

        if(!name || !email || !message){
            return res.status(400).json({error:"all fields required"})
        }

        const newContact = new Contact({name, email, message})
        await newContact.save()
        res.status(201).json({ message: "Contact message saved successfully" });
    }catch(err){
        return res.status(500).json({message:"Internal server error"})
    }
}

//get
const getAllContacts = async (req, res) => {
    try{
        const contacts = await Contact.find().sort({createdAt:-1})
        res.status(200).json(contacts)
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = {createContact, getAllContacts}