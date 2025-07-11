import React,{useState} from 'react'
import axios from 'axios'

const Contact = () => {
    const [formData , setFormData] = useState({
        name:'',
        email:'',
        message:'',
    })

    const handleChange = (e) =>{
        setFormData({...formData , [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            await axios.post("/api/contact", formData)
            alert('Form Submitted..')
            setFormData({name:'', email:'' , message: '' }) // will reset form
        }catch(error){
            alert('Error submitting the form')
            console.error(error)
        }
        
    }
  return (
    <div className='bg-gray-700 flex items-center justify-center'>
        <div className='bg-white flex flex-col gap-4 p-10 my-2 items-center justify-center '>
            <h2 className='text-center text-4xl'>Contact Us</h2>
            <form 
            onSubmit={handleSubmit}
            className='flex flex-col gap-6 items-center'
            >
            <input
            className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type='text'
            name='name'
            placeholder='Your Name here... '
            value={formData.name}
            onChange={handleChange}
            required
            /> 
            <input 
            className="w-80 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="email"
            name='email'
            placeholder='Your email...'
            value={formData.email}
            onChange={handleChange}
            required
            />
            <textarea 
            className="w-80 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            name="message" 
            id="message"
            placeholder='Your message here...'
            value={formData.message}
            onChange={handleChange}
            required
            />
            <button 
            className='border rounded-lg w-40 p-4 hover:bg-gray-400 elevate-90'
            type='submit'>Send Message</button>
            </form>
        </div>
    </div>
  )
}

export default Contact