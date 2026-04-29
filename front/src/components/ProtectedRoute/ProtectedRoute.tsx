import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated = import.meta.env.VITE_IS_AUTHENTICATED === "true";

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
