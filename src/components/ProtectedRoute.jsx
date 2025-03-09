import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is NOT logged in, redirect to login page
  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  return children; // If logged in, show the protected page
};

export default ProtectedRoute;
