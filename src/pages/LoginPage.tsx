import { useState, FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Form } from "@/components/Form";
import { Toast } from "@/components/Toast";
import { login } from "@/service/auth";


export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!email || !password) {
      setToast({ msg: "Preencha todos os campos", type: "error" });
      return;
    }
  
    try {
      setLoading(true);
  
      const res = await login(email, password); 
  
      localStorage.setItem("token", res.data.access_token);
  
      setToast({ msg: "Login efetuado!", type: "success" });
  
      setTimeout(() => {
        navigate({ to: "/dashboard" });
      }, 600);
  
    } catch (error) {
      setToast({ msg: "Email ou senha inválidos", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent p-4">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg mb-3">
              A
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Bem-vindo de volta</h1>
            <p className="text-sm text-muted-foreground mt-1">Entre com sua conta para continuar</p>
          </div>
          <Form onSubmit={onSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              type="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" loading={loading} className="w-full" size="lg">
              Entrar
            </Button>
          </Form>
          <p className="text-center text-sm text-muted-foreground mt-6">
            Não tem conta?{" "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
