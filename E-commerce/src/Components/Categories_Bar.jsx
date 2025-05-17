import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Categories_Bar = () => {
    const [categories , setCategories] = useState([])
    const fetchCategories = async ()=>{
       try{
        const res = await axios.get('http://localhost:5000/api/categories')
        setCategories(res.data)
       } catch(err){
        console.error("Error fetching categories:",err)
       }
    }

    useEffect(()=>{
        fetchCategories()
    },[categories])
  return (
    <div className='bg-gray-600 flex justify-between px-4 py-2 text-white'>
        {categories.map((cat)=>(
            <NavLink 
            className="hover:text-blue-400"
            key={cat._id}
            >{cat.name} </NavLink>
        ))}
    </div>
  )
}

export default Categories_Bar