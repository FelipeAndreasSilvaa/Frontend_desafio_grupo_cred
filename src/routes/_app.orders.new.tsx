import { createFileRoute } from "@tanstack/react-router";
import { NewOrderPage } from "@/pages/NewOrderPage";

export const Route = createFileRoute("/_app/orders/new")({
  component: NewOrderPage,
});
