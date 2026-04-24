import { useRegisterForm } from "@/hooks/useHookForms";
import { useNavigate } from "@tanstack/react-router";
import { useUsers } from "@/hooks/useUsers";

export function RegisterPage() {
  const { register, handleSubmit, reset, errors } = useRegisterForm()
  const { handleCreate, loading, error } = useUsers()
  const navigate = useNavigate(); 

  async function onSubmit(data) {
    await handleCreate(data)
    reset()
    navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent p-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Criar conta</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Preencha os campos para se cadastrar
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              
              <div>
                <label className="text-sm">Nome completo</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Nome" {...register("nome", { required: true })} />
                {errors.nome && <span className="text-red-500">Nome é obrigatório</span>}

              </div>

              <div>
                <label className="text-sm">Idade</label>
                <input className="w-full border rounded px-3 py-2" type="number" placeholder="Idade" {...register("idade", { required: true, valueAsNumber: true })} />
                {errors.idade && <span className="text-red-500">Idade é obrigatório</span>}
              </div>

              <div>
                <label className="text-sm">CPF</label>
                <input className="w-full border rounded px-3 py-2" placeholder="CPF" {...register("cpf", { required: true })} />
                {errors.cpf && <span className="text-red-500">Cpf é obrigatório</span>}
              </div>

              <div>
                <label className="text-sm">RG</label>
                <input className="w-full border rounded px-3 py-2" {...register("rg", { required: true })}  />
                {errors.rg && <span className="text-red-500">RG é obrigatório</span>}
              </div>

              <div>
                <label className="text-sm">Email</label>
                <input type="email" placeholder="Email" className="w-full border rounded px-3 py-2" {...register("email", { required: true })}  />
                {errors.email && <span className="text-red-500">Email é obrigatório</span>}
              </div>

              <div>
                <label className="text-sm">Senha</label>
                <input type="password" className="w-full border rounded px-3 py-2" {...register("senha", { required: true, minLength: 6 })} />
                {errors.senha && <span className="text-red-500">Senha é obrigatório</span>}
              </div>

            </div>
            
            <div className="flex gap-3 pt-4">
                <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
                  {loading ? "Carregando..." : "Cadastrar"}
              </button>

              <button
                type="button"
                className="border px-4 py-2 rounded"
              >
                Cancelar
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Já tem uma conta?{" "}
            <a href="/" className="text-blue-600 font-medium hover:underline">
              Entrar
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}
