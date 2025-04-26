import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ProductCard = () => {
    const [loading , setLoading] = useState(false)
    const [products , setProducts] = useState([])

    const fetchData = async() =>{
        setLoading(true)
        try{
            const res = await axios.get('https://dummyjson.com/products')
             setProducts(res.data.products)
        }catch(err){
            console.error( "unable to load data....", err )
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div>
        Product page

        {products && products.map(product => (
            <div key={product.id}>
                <p>{product.title}</p>
            </div>
        ))}
    </div>
  )
}

export default ProductCard