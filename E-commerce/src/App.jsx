import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {LoginPage} from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import React from 'react'
import Profile from './Components/Profile';
import { Navbar } from './Components';
import Footer from './Components/Footer';
import About from './pages/About';
import Layout from './layouts/Layout';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>} > 
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/signup" element={<SignupPage />} />
          <Route path = "/profile/:username" element={<Profile/>}/>
          <Route path ="/navbar" element={<Navbar/>} />
          <Route path ="/footer" element={<Footer/>} />
          <Route path ="/about" element={<About/>} />
        </Route>  
      </Routes>
    </BrowserRouter>
    // <ProductCard/>
  );
}

export default App;
