import { createFileRoute } from "@tanstack/react-router";
import { DashboardHomePage } from "@/pages/DashboardHomePage";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardHomePage,
});
