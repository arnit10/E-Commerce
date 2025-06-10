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
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import LayoutForAdmin from './layouts/LayoutForAdmin';
import AddProduct from './Components/Admin/AddProduct';
import EditProduct from './Components/Admin/EditProduct';



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
          <Route path ="/about" element={<About/>} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/categories' element={<Categories/>}/>
          <Route path="/category/:name" element={<ProductListByCategory />} />
          <Route path= '/cart' element={<CartPage/>}/>
          <Route path= '/thank-you' element={<ThankYou/>}/>

          //admin paths
          {/* <Route path="/admin/login" element={<AdminLogin/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/register" element={<AdminRegister />} /> */}

        </Route>  
        <Route path="/admin" element={<LayoutForAdmin />}>
          <Route index element={<AdminDashboard />} />
          <Route path='/admin/add-product' element={<AddProduct/>}/>
          <Route path='/admin/edit-product/:id' element={<EditProduct/>}/>
        </Route>
        <Route path="/admin/login" element={<AdminLogin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
