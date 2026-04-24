import api from "@/service/api";

describe("Users", () => {
  let token: string;

  beforeAll(async () => {
    const email = `teste_${Date.now()}@email.com`;

    // cria usuário
    await api.post("/users", {
      nome: "Teste User",
      idade: 25,
      email,
      senha: "123456",
      cpf: String(Date.now()),
    });

    // faz login
    const res = await api.post("/auth/login", {
      email,
      senha: "123456",
    });

    token = res.data.access_token;

    // coloca token no axios
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  });

  it("deve listar usuários", async () => {
    const res = await api.get("/users");

    expect(Array.isArray(res.data)).toBe(true);
  });
});