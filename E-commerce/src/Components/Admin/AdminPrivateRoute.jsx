import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    // If no token, send to login page
    return <Navigate to="/admin/login" replace />;
  }

  return children; // If token exists, show the actual component
};

export default AdminPrivateRoute;
