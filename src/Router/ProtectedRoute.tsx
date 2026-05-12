import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "../features/auth/services/auth.service";

export const ProtectedRoute = ({ children }: any) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    authService.getUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  if (!user) return <Navigate to="/" />;

  return children;
};