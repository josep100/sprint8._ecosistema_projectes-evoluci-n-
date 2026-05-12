import { useState } from "react";
import { authService } from "../services/auth.service";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const user = await authService.login(email, password);
      return user;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};