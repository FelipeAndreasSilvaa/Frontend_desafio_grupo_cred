import api from "./api";

export const login = (email: string, senha: string) =>
  api.post("/auth/login", { email, senha });

export const createUser = (data: any) =>
  api.post("/users", data);

export const getUsers = () =>
  api.get("/users");

export const updateUser = (id: number, data: any) =>
  api.patch(`/users/${id}`, data);

export const deleteUser = (id: number) =>
  api.delete(`/users/${id}`);

export const getUserById = (id: number) => {
  return api.get(`/users/${id}`);
};