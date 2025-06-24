import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import Layout from "./layouts/Layout";
import LayoutWithCategoryBar from "./layouts/LayoutWithCategoryBar";
import LayoutForAdmin from "./layouts/LayoutForAdmin";

//component
import Categories from "./Components/Categories";

// Pages (User)
import HomePage from "./pages/HomePage";
import {LoginPage} from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { Profile } from "./Components";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductListByCategory from './Components/ProductListByCategory'
import CartPage from "./pages/CartPage";
import ThankYou from "./pages/ThankYou";
import UserOrders from "./Components/UserOrders";

// Pages (Admin)
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddProduct from "./Components/Admin/AddProduct";
import EditProduct from "./Components/Admin/EditProduct";
import AdminUsers from "./Components/Admin/AdminUsers";
import AdminOrders from "./Components/Admin/AdminOrders";

// Protected Route
import AdminPrivateRoute from "./Components/Admin/AdminPrivateRoute";
import Address from "./Components/Address";
import AdminInbox from "./Components/Admin/AdminInbox";
import ProductDetails from "./pages/ProductDetails";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* User Layout with Category Bar */}
        <Route path="/" element={<LayoutWithCategoryBar />}>
          <Route index element={<HomePage />} />
          <Route path="category/:name" element={<ProductListByCategory />} />
        </Route>

        {/* Main User Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="profile/:username" element={<Profile />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="categories" element={<Categories />} />
          <Route path="category/:name" element={<ProductListByCategory />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="thank-you" element={<ThankYou />} />
          <Route path="address" element={<Address/>} />
          <Route path="my-orders" element={<UserOrders/>} />
          <Route path="product/:id" element={<ProductDetails/>} />
        </Route>

        {/* Admin Layout with Protected Routes */}
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <LayoutForAdmin />
            </AdminPrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="products-by-category" element={<Categories isAdmin={true} />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="orders" element={<AdminOrders/>} />
          <Route path="inbox" element={<AdminInbox/>} />
        </Route>

        {/* Admin Public Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
