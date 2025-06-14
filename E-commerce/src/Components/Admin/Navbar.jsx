import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';  // Adjust path as needed

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
  localStorage.removeItem("adminToken");
  navigate('/admin/login');
  };


  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/admin">Admin Dashboard</Link>
      </div>
      
      <ul className="flex space-x-6">
        <li>
          <NavLink 
            to="/admin" 
            className={({ isActive }) => isActive ? 'underline' : ''}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/products-by-category" 
            className={({ isActive }) => isActive ? 'underline' : ''}
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => isActive ? 'underline' : ''}
          >
            Orders
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => isActive ? 'underline' : ''}
          >
            Users
          </NavLink>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
