import api from "@/service/api";

let orderId: number;

describe("Orders", () => {
  it("deve criar pedido", async () => {
    const res = await api.post("/order", {
      descricao: "Pedido teste",
      userId: 1,
    });

    expect(res.data).toHaveProperty("id");

    orderId = res.data.id;
  });

  it("deve listar pedidos", async () => {
    const res = await api.get("/order");

    expect(Array.isArray(res.data)).toBe(true);
  });
});