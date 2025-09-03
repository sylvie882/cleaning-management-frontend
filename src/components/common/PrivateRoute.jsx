// src/components/common/PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ role }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  console.log(user.user.role);

  // Check if user is authenticated
  if (!user) {
    // Redirect to login page with return URL
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  // Check role authorization if role is specified
  if (role && user.user.role !== role) {
    // Redirect to appropriate dashboard based on role
    switch (user.user.role) {
      case "admin":
        return <Navigate to="/dashboard/admin" replace />;
      case "head_cleaner":
        return <Navigate to="/dashboard/head" replace />;
      case "cleaner":
        return <Navigate to="/dashboard/cleaner" replace />;
      case "accountant":
        return <Navigate to="/dashboard/accountant" replace />;
      case "manager":
        return <Navigate to="/dashboard/manager" replace />;
      default:
        return <Navigate to="/admin-login" replace />;
    }
  }

  // If user is authenticated and authorized, render the children
  return <Outlet />;
};

export default PrivateRoute;
