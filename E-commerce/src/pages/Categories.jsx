import React from 'react'
import { Link } from 'react-router-dom'

const categories = [
    {
        name:"Men's Clothing",
        image:"https://www.el-style.com/blog/articles/1057-mens-fall-street-casual-style/img_2.jpg",
        link:"/"
    },
    {
        name:"Women's Clothing",
        image:"https://th.bing.com/th/id/OIP._t--a7X2RC9lUkrePIR6pAHaLH?cb=iwp1&rs=1&pid=ImgDetMain",
        link:"/contact" 
    },
    {
        name:"Electronics",
        image:"https://images.squarespace-cdn.com/content/v1/5ae8bd2f89c1723a6f6f557b/1565794679412-QOSVO1NO2JF104SBAU4R/AdobeStock_237119664.jpeg",
        link:"/about"
    },
    {
        name:"Home Appliances",
        image:"https://img.global.news.samsung.com/global/wp-content/uploads/2018/05/Flat-Design_1_main_1.jpg",
        link:"/login"
    }
]
const Categories = () => {
  return (
    <div className='bg- p-10 '>
        <h2 className='text-5xl text-center pb-10'>Shop by Category</h2>
        <div className='flex flex-col items-center justify-center gap-20'>
            {categories.map((category , index) =>(
                <Link 
                key={index}
                to={category.link}
                className=''
                >
                <img
                src={category.image}
                alt={category.image}
                className='w-100 h-100 rounded-4xl'
                />
                <h3 className='text-center text-2xl '> {category.name}</h3>

                </Link>
            ))}
        </div>
    </div>
  )
}

export default Categories