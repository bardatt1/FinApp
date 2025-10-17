import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Simple placeholder protection: checks localStorage token
function ProtectedRoute({ component }) {
  const location = useLocation();
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return component;
}

export default ProtectedRoute;


