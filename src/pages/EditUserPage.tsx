"use client"
import { useState, FormEvent, useEffect } from "react";
import { Link, useParams, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Form, FormGrid } from "@/components/Form";
import { Toast } from "@/components/Toast";
import { useUsers } from "@/hooks/useUsers";


export function EditUserPage() {
  const { userId } = useParams({ from: "/_app/users/$userId/edit" });
  const navigate = useNavigate();
  const {fetchUserById, handleUpdate} = useUsers()

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const user = await fetchUserById(Number(userId));


      setForm({
        nome: user.nome,
        idade: String(user.idade),
        email: user.email,
      });
    }

    loadUser();
  }, [userId]);

  const update = (k: string) => (e: any) =>
    setForm({ ...form, [k]: e.target.value });

  async function onSubmit(e: any) {
    e.preventDefault();

    setLoading(true);

    await handleUpdate(Number(userId), {
      ...form,
      idade: Number(form.idade), 
    });

    setLoading(false);

    navigate({ to: "/users" });
  }

  if (!form) return <p>Carregando...</p>;

  return (
    <div className="p-8 max-w-3xl">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <Link to="/users" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>
      <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight">Editar usuário</h1>
        <p className="text-sm text-muted-foreground mt-1 mb-6">Atualize as informações abaixo</p>
        <Form onSubmit={onSubmit}>
          <FormGrid>
            <Input label="Nome completo" name="nome" value={form.nome} onChange={update("nome")} />
            <Input label="Idade" name="idade" type="number" value={form.idade} onChange={update("idade")} />
            <Input label="Email" name="email" type="email" value={form.email} onChange={update("email")} />
          </FormGrid>
          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={loading}>Salvar alterações</Button>
            <Link to="/users"><Button type="button" variant="outline">Cancelar</Button></Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
