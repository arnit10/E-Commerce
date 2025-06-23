import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 ">
        <div className='flex flex-row justify-between px-6'>
            <div>
                <h2>NextCart</h2>
                <p>Your one stop solution for electronics..</p>
            </div>
            <div className='hidden md:block'>
                <h3>Quick Links</h3>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/about"}>About</Link></li>
                    <li><Link to={"/categories"}>Categories</Link></li>
                    <li><Link to={"/contact"}>Contact</Link></li>
                </ul>
            </div>
            <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">Email: support@myshop.com</p>
            <p className="text-gray-400 text-sm">Phone: +91 98765 432XX</p>
            <p className="text-gray-400 text-sm">Address: 123 Market Street, City, India</p> 
            </div>
            
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} NextCart. All rights reserved.
            </div>
    </footer>
  )
}

export default Footer