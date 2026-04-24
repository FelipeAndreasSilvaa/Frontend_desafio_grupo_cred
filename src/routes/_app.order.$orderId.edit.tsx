import { createFileRoute } from "@tanstack/react-router";
import { EditOrderPage } from "@/pages/EditOrderPage";

export const Route = createFileRoute("/_app/order/$orderId/edit")({
  component: EditOrderPage,
});
