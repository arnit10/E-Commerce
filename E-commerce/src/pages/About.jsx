import React from 'react'

const About = () => {
  return (
    <div className=' bg-white px-6 py-12 text-center'>
      <h1 className='text-5xl font-bold text-gray-800 mb-6'>About Us</h1>
      <p className='text-lg text-gray-700 max-w-3xl mx-auto mb-6'>Welcome to <span className='text-blue-600 font-semibold'> NextCart </span> your go-to destination for quality products and unbeatable prices. We’re passionate about bringing you the best items across a wide range of categories, all in one convenient place.</p>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        Whether you're shopping for the latest fashion, everyday essentials, or thoughtful gifts, we’re here to make your experience easy, fast, and enjoyable. Our platform is built using modern technologies like <span className="font-medium">React</span> and <span className="font-medium">Django</span> to ensure a smooth and secure shopping experience.
      </p>

      <p className="text-gray-600 max-w-2xl mx-auto">
        At My Shop, we believe that shopping should be simple, affordable, and fun. Thanks for stopping by — we’re glad you’re here!
      </p>
    </div>
  )
}

export default About