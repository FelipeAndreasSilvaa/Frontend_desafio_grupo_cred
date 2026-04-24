"use client"
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/Button";
import { Table, THead, TBody, TR, TH, TD } from "@/components/Table";
import { useOrders } from "@/hooks/useOrder";
import { useUsers } from "@/hooks/useUsers";

export function OrdersPage() {
  const [filter, setFilter] = useState<string>("all");

  const { orders, getOrders, getOrdersByUser, deleteOrder } = useOrders();
  const { users, fetchUsers } = useUsers();

    async function handleDelete(id: number) {
      const confirmDelete = confirm("Deseja excluir este pedido?");
    
      if (!confirmDelete) return;
    
      await deleteOrder(id);
    }
  

  useEffect(() => {
    getOrders();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (filter === "all") {
      getOrders();
    } else {
      getOrdersByUser(Number(filter));
    }
  }, [filter]);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pedidos</h1>
          <p className="text-sm text-muted-foreground mt-1">Lista de pedidos realizados</p>
        </div>

        <Link to="/orders/new">
          <Button>
            <Plus className="h-4 w-4" /> Novo pedido
          </Button>
        </Link>
      </div>

      {/* FILTRO */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Filtrar por usuário:</label>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="all">Todos</option>

          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nome}
            </option>
          ))}
        </select>
      </div>

      {/* TABELA */}
      <Table>
        <THead>
          <TR>
            <TH>#</TH>
            <TH>Usuário</TH>
            <TH>Descrição</TH>
            <TH>Data</TH>
            <TH className="text-right">Ações</TH>
          </TR>
        </THead>

        <TBody>
          {orders.map((o) => (
            <TR key={o.id}>
              <TD className="font-mono">#{o.id}</TD>

              <TD className="font-medium">{o.user?.nome || "Sem usuário"}</TD>

              <TD>{o.descricao}</TD>

              <TD className="text-muted-foreground">
                {new Date(o.createdAt).toLocaleDateString("pt-BR")}
              </TD>
              <TD className="text-right">
                <div className="flex justify-end gap-2">
                  <Link to="/order/$orderId/edit" params={{ orderId: String(o.id) }}>
                    <Button size="sm" variant="outline">
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </Button>
                  </Link>

                  <Button size="sm" variant="danger" onClick={() => handleDelete(o.id)}>
                    <Trash2 className="h-3.5 w-3.5" /> Excluir
                  </Button>
                </div>
              </TD>
            </TR>
          ))}

          {orders.length === 0 && (
            <TR>
              <TD className="text-center text-muted-foreground py-8">Nenhum pedido encontrado</TD>
            </TR>
          )}
        </TBody>
      </Table>
    </div>
  );
}