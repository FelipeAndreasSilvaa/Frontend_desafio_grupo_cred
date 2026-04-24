"use client"
import { useEffect, useState } from "react";
import { Users, Package, TrendingUp, Activity } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import { useOrders } from "@/hooks/useOrder";


export function DashboardHomePage() {
  const { users,fetchUsers } = useUsers();
  const { getOrders } = useOrders();

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
    
    getOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const stats = [
    { label: "Usuários", value: users.length, icon: Users, color: "text-primary" },
    { label: "Pedidos", value: orders.length, icon: Package, color: "text-success" },
    { label: "Ativos hoje", value: users.length, icon: Activity, color: "text-success" },
  ];


  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral do sistema</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <Icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <p className="text-3xl font-bold mt-2 tracking-tight">{s.value}</p>
            </div>
          );
        })}
      </div>
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold mb-1">Bem-vindo 👋</h2>
        <p className="text-sm text-muted-foreground">
          Use o menu lateral para navegar pelas seções: gerenciar usuários, criar e listar pedidos.
        </p>
      </div>
    </div>
  );
}
