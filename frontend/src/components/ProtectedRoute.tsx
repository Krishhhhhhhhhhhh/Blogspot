import { Navigate } from "react-router-dom";
import { getToken } from "../utils/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};
