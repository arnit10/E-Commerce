import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-gray-100 text-center py-20 px-6'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to NextCart</h1>
        <p className='text-lg mb-4'>Discover amazing deals and exclusive collections</p>
        <button 
        className='bg-black text-white rounded-3xl px-6 py-2 hover: cursor-pointer'
        >Shop now</button>
    </section>
  )
}

export default Hero