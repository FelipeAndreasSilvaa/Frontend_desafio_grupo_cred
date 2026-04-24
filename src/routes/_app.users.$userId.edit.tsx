import { createFileRoute } from "@tanstack/react-router";
import { EditUserPage } from "@/pages/EditUserPage";

export const Route = createFileRoute("/_app/users/$userId/edit")({
  component: EditUserPage,
});
