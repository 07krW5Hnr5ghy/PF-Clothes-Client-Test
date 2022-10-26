import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ children, us }) => {
  if (!us) {
    return <Navigate to="/login" />;
  }
  return children ? children : <Outlet />;
};

export const ProtectedRoutes = ({ children, us }) => {
  if (us) {
    return <Navigate to="/home" />;
  }
  return children ? children : <Outlet />;
};
