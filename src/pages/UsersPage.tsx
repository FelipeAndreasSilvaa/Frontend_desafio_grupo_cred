"use client"
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Table, THead, TBody, TR, TH, TD } from "@/components/Table";
import { Toast } from "@/components/Toast";
import { useUsers } from "@/hooks/useUsers";


export function UsersPage() {
  const {users, fetchUsers, loading, handleDelete} = useUsers();
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const filtered = users.filter((u) =>
    u.nome.toLowerCase().includes(query.toLowerCase()) ||
    u.email.toLowerCase().includes(query.toLowerCase())
  );

  async function onDelete(id: number) {
    try {
      await handleDelete(id); // 👈 chama backend
  
      setToast({ msg: "Usuário excluído!", type: "success" });
  
    } catch {
      setToast({ msg: "Erro ao excluir usuário", type: "error" });
    }
  }

  useEffect(() => {
    fetchUsers(); 
  }, []);

  if (loading) return <p>Carregando...</p>;
  return (
    <div className="p-8 space-y-6">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Usuários</h1>
          <p className="text-sm text-muted-foreground mt-1">Lista de usuários cadastrados</p>
        </div>
        <Link to="/register">
          <Button><Plus className="h-4 w-4" /> Novo usuário</Button>
        </Link>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Buscar por nome ou email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Table>
        <THead>
          <TR>
            <TH>Nome</TH>
            <TH>Email</TH>
            <TH>Idade</TH>
            <TH className="text-right">Ações</TH>
          </TR>
        </THead>
        <TBody>
          {filtered.map((u) => (
            <TR key={u.id}>
              <TD className="font-medium">{u.nome}</TD>
              <TD className="text-muted-foreground">{u.email}</TD>
              <TD>{u.idade}</TD>
              <TD>
                <div className="flex justify-end gap-2">
                  <Link to="/users/$userId/edit" params={{ userId: String(u.id) }}>
                    <Button size="sm" variant="outline"><Pencil className="h-3.5 w-3.5" /> Editar</Button>
                  </Link>
                  <Button size="sm" variant="danger" onClick={() => onDelete(u.id)}>
                    <Trash2 className="h-3.5 w-3.5" /> Excluir
                  </Button>
                </div>
              </TD>
            </TR>
          ))}
          {filtered.length === 0 && (
            <TR>
              <TD className="text-center text-muted-foreground py-8">Nenhum usuário encontrado</TD>
            </TR>
          )}
        </TBody>
      </Table>
    </div>
  );
}
