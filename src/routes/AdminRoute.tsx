import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

const AdminRoute: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  // This assumes that the parent route is already protected by ProtectedRoute,
  // so we don't need to check for isAuthenticated again, just the role.
  // If the user object is not available or the role is not ADMIN, redirect.
  if (!user || user.role !== 'ADMIN') {
    // Redirect to a more appropriate page, like the dashboard or a 403 page.
    // For now, redirecting to the dashboard is a safe choice.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
