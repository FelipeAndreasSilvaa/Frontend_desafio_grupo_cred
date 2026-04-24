"use client"
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Form } from "@/components/Form";
import { Toast } from "@/components/Toast";
import { useOrders } from "@/hooks/useOrder";
import { useUsers } from "@/hooks/useUsers";

export function EditOrderPage() {
  const { orderId } = useParams({ from: "/_app/order/$orderId/edit" });
  const navigate = useNavigate();

  const { orders, getOrders, updateOrder } = useOrders();
  const { users, fetchUsers } = useUsers();

  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<any>(null);


  // 🔥 carregar pedido
  useEffect(() => {
    async function loadOrder() {
      const data = await getOrders();
      const order = data.find((o: any) => o.id === Number(orderId));

      setForm({
        descricao: order?.descricao || "",
        userId: order?.userId || "",
      });
    }

    loadOrder();
  }, [orderId]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const update = (k: string) => (e: any) =>
    setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: any) {
    e.preventDefault();

    setLoading(true);

    await updateOrder(Number(orderId), {
      descricao: form.descricao,
      userId: Number(form.userId),
    });

    setLoading(false);

    setToast({ msg: "Pedido atualizado!", type: "success" });

    setTimeout(() => {
      navigate({ to: "/orders" });
    }, 800);
  }

  if (!form) return <p>Carregando...</p>;

  return (
    <div className="p-8 max-w-2xl">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <Link to="/orders" className="inline-flex items-center gap-1 text-sm mb-4">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-bold">Editar pedido</h1>
        <p className="text-sm text-muted-foreground mb-4">Atualize as informações do pedido</p>

        <Form onSubmit={onSubmit}>
          {/* DESCRIÇÃO */}
          <Input label="Descrição" value={form.descricao} onChange={update("descricao")} />

          {/* USUÁRIO (AGORA COM NOME) */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Usuário</label>

            <select
              value={form.userId}
              onChange={(e) => update("userId")(e)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Selecione um usuário</option>

              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 mt-4">
            <Button type="submit" loading={loading}>
              Salvar
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