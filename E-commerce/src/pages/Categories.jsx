import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Categories = () => {
    const [categories , setCategories] = useState([])
    const fetchCategories = async() =>{
        try{
            const res = await axios.get('http://localhost:5000/api/categories')
            setCategories(res.data)
            console.log(categories)
        }catch(error){
            console.error("Error :",error)
        }
    }

    useEffect(()=>{
        fetchCategories()
    },[])
  return (
    <div className='bg- p-10 '>
        <h2 className='text-5xl text-center pb-10'>Shop by Category</h2>
        <div className='flex gap-20'>
            {categories.map((cat) =>(
                <Link 
                key= {cat._id}
                to='#'
                className=''
                >
                    <h3 className='text-center text-2xl '> {cat.name}</h3>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default Categories