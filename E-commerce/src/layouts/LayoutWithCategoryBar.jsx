import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Components';
import Footer from '../Components/Footer';
import Categories_Bar from '../Components/CategoriesBar';

const LayoutWithCategoryBar = () => {
  return (
    <>
      <Navbar />
      <Categories_Bar />
      <Outlet />
      <Footer />
    </>
  );
};

export default LayoutWithCategoryBar;
