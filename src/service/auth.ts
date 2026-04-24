import api from "./api";

export const login = (email: string, senha: string) => {
  return api.post("/auth/login", { email, senha });
};

export function isAuthenticated() {
  if (typeof window === "undefined") return false;

  return !!localStorage.getItem("token");
}