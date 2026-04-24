import { useState } from "react";
import { login } from "@/service/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);

  async function handleLogin(email: string, senha: string) {
    try {
      setLoading(true);

      const res = await login(email, senha);

      localStorage.setItem("token", res.data.access_token); 

    } finally {
      setLoading(false);
    }
  }

  return {
    handleLogin,
    loading,
  };
}