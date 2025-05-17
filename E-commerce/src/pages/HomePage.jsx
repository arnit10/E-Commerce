import React from 'react'
import Hero from '../Components/Hero'
import Products from '../Components/Products'
import PromoBanner from '../Components/PromoBanner'
import Testimonials from '../Components/Testimonials'
import Newsletter from '../Components/NewsLetter'
import Categories_Bar from '../Components/Categories_Bar'


const HomePage = () => {
  return(
    <>
      <Categories_Bar/>
      <Hero/>
      <Products/>
      <PromoBanner/>
      <Testimonials/>
      <Newsletter/>
      
    </>
  )
}

export default HomePage