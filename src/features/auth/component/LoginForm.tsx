import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/loginSchema";
import type { LoginSchema } from "../schema/loginSchema";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";

import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import {
  BadgeCheck,
  Fingerprint,
  Lock,
  ShieldCheck,
  IdCard,
  Eye,
  Activity,
  ClipboardList,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data: LoginSchema) => {
    await login(data.email, data.password);
    navigate("/app");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <section aria-labelledby="login-title" className="w-full max-w-md">
        <Card className="border-slate-200 shadow-2xl rounded-2xl">
          <CardHeader className="space-y-3 text-center p-8">
            <div className="space-y-1">
              <h1
                id="login-title"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                Portal clínico
              </h1>

              <p className="text-sm text-slate-500">
                Acceso seguro para profesionales sanitarios
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="collegeId"
                  className="text-sm font-semibold text-slate-700"
                >
                  email
                </label>

                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="email"
                    type="text"
                    placeholder="doctor@clinic.com"
                    className="pl-11 py-5"
                    {...register("email")}
                  />
                </div>

                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 pr-10 py-5"
                    {...register("password")}
                  />

                  <button
                    type="button"
                    aria-label="Mostrar contraseña"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <Eye className="size-4" />
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="h-12 w-full gap-2 rounded-xl text-sm font-bold"
              >
                Iniciar sesión
              </Button>
            </form>
          </CardContent>
        </Card>

        <footer className="mt-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-700">
            Solo personal autorizado
          </div>

          <p className="mx-auto max-w-xs text-[11px] leading-relaxed text-slate-500">
            El acceso a este sistema está restringido. Los intentos no
            autorizados de acceder o utilizar este portal pueden dar lugar a un
            proceso penal y sanciones civiles.
          </p>
        </footer>
        <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none">
          <Activity className="text-primary size-30" />
        </div>
        <div className="absolute top-40 right-10 opacity-10 pointer-events-none transform rotate-12">
          <ClipboardList className="text-primary size-20" />
        </div>
      </section>
    </main>
  );
};

export default LoginForm;
