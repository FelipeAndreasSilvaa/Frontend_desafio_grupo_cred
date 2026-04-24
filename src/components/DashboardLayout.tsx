import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { LayoutDashboard, Users, Package, PlusCircle, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/users", label: "Usuários", icon: Users },
  { to: "/orders", label: "Pedidos", icon: Package },
  { to: "/orders/new", label: "Novo Pedido", icon: PlusCircle },
];

export function DashboardLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex w-full bg-background">
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="px-6 py-5 border-b border-border">
          <h1 className="text-lg font-bold tracking-tight">
            <span className="text-primary">Admin</span>Panel
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Painel de gestão</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
