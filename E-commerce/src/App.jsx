import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import Profile from './Components/Profile';
import { Navbar } from './Components';
import Footer from './Components/Footer';
import About from './pages/About';
import Layout from './layouts/Layout';
import LayoutWithCategoryBar from './layouts/LayoutWithCategoryBar';
import Contact from './pages/Contact';
import Categories from './pages/Categories';
import ProductListByCategory from './Components/ProductListByCategory';
import CartPage from './pages/CartPage';
import ThankYou from './pages/ThankYou';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutWithCategoryBar />}>
          <Route index element={<HomePage />} />
          <Route path="category/:name" element={<ProductListByCategory />} />
        </Route>

        <Route path='/' element={<Layout/>} > 
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path = "/profile/:username" element={<Profile/>}/>
          <Route path ="/navbar" element={<Navbar/>} />
          <Route path ="/footer" element={<Footer/>} />
          <Route path ="/about" element={<About/>} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path="/category/:name" element={<ProductListByCategory />} />
          <Route path= '/cart' element={<CartPage/>}/>
          <Route path= '/thank-you' element={<ThankYou/>}/>

        </Route>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
