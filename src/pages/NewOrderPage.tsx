"use client"
import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Form } from "@/components/Form";
import { Toast } from "@/components/Toast";
import { useOrders } from "@/hooks/useOrder";
import { useUsers } from "@/hooks/useUsers";

export function NewOrderPage() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const { createOrder } = useOrders();
  const { users, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers(); 
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!userId || !descricao) {
      setToast({ msg: "Preencha todos os campos", type: "error" });
      return;
    }

    try {
      setLoading(true);

      await createOrder({
        descricao,
        userId: Number(userId), 
      });

      setToast({ msg: "Pedido criado com sucesso!", type: "success" });

      setTimeout(() => {
        navigate({ to: "/orders" });
      }, 800);

    } catch {
      setToast({ msg: "Erro ao criar pedido", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Link
        to="/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Novo pedido</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-6">
          Crie um pedido vinculado a um usuário
        </p>

        <Form onSubmit={onSubmit}>
          {/* SELECT DE USUÁRIOS */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Usuário</label>

            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Selecione um usuário</option>

              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          {/* DESCRIÇÃO */}
          <Input
            label="Descrição"
            name="descricao"
            placeholder="Ex: Notebook Dell XPS 13"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={loading}>
              Criar pedido
            </Button>

            <Link to="/orders">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}