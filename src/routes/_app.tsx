import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AuthGuard } from "@/components/AuthGuard";

export const Route = createFileRoute("/_app")({
  component: () => (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  ),
});