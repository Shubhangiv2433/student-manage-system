import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Redirects authenticated users away from login/register
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
};

export default PublicRoute;
