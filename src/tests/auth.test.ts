import api from "@/service/api";

describe("Auth", () => {
  it("deve fazer login com sucesso", async () => {
    const res = await api.post("/auth/login", {
      email: "luisa@gmail.com",
      senha: "luisateste",
    });

    expect(res.data).toHaveProperty("access_token");
  });

  it("deve falhar com senha errada", async () => {
    try {
      await api.post("/auth/login", {
        email: "luisa@gmail.com",
        senha: "errada",
      });
    } catch (error: any) {
      expect(error.response.status).toBe(401);
    }
  });
});