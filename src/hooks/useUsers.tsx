import { useState } from "react";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "@/service/users";
import { getUserById } from "@/service/users";

export function useUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers() {
    try {
      setLoading(true);
      setError(null);

      const res = await getUsers();

      setUsers(res.data); 
    } catch {
      setError("Erro ao buscar usuários");
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserById(id: number) {
    const res = await getUserById(id);
    return res.data;
  }

  async function handleCreate(data: any) {
    try {
      setLoading(true);
      setError(null);

      await createUser(data);
      await fetchUsers(); 
    } catch {
      setError("Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(id: number, data: any) {
    try {
      setLoading(true);
      setError(null);

      await updateUser(id, data);
      await fetchUsers(); 
    } catch {
      setError("Erro ao atualizar usuário");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      setLoading(true);
      setError(null);

      await deleteUser(id);
      await fetchUsers(); 
    } catch {
      setError("Erro ao deletar usuário");
    } finally {
      setLoading(false);
    }
  }

  return {
    users, 
    loading,
    error,
    fetchUsers,
    handleCreate,
    handleUpdate,
    handleDelete,
    fetchUserById,
  };
}