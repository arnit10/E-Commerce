import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Admin/Navbar'
import { Footer } from '../Components'

const LayoutForAdmin = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default LayoutForAdmin