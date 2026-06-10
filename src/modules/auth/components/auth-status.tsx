"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { ArrowRight, Cloud, Eye, EyeOff, ShieldCheck, ShoppingCart, User } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/modules/auth";

const featureList = [
  {
    title: "Reportes en tiempo real",
    description: "Toma mejores decisiones",
    icon: ShoppingCart,
  },
  {
    title: "Seguro y confiable",
    description: "Tus datos siempre protegidos",
    icon: ShieldCheck,
  },
  {
    title: "Accede desde cualquier lugar",
    description: "En cualquier dispositivo",
    icon: Cloud,
  },
];

export function AuthStatus() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [email, setEmail] = useState("usuario@ejemplo.com");
  const [password, setPassword] = useState("123456789012");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSession({
      user: {
        id: "user-1",
        name: "Administrador",
        email,
        role: "admin",
      },
      accessToken: "mock-token",
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(),
    });

    router.replace("/");
  }

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_32%),linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] px-3 py-3 text-slate-950 sm:px-5 sm:py-4 lg:h-screen lg:overflow-hidden lg:px-6 lg:py-4 2xl:px-8 2xl:py-5">
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-[1480px] flex-col justify-between gap-2 sm:min-h-[calc(100vh-2rem)] lg:h-full lg:min-h-0">
        <div className="grid flex-1 overflow-hidden rounded-[28px] border border-blue-100/80 bg-white/90 shadow-[0_24px_60px_rgba(37,99,235,0.14)] backdrop-blur xl:grid-cols-[0.96fr_1.04fr] 2xl:grid-cols-[1.02fr_0.98fr]">
          <div className="relative overflow-hidden bg-[linear-gradient(180deg,_#f8fbff_0%,_#edf3ff_100%)] px-5 py-6 sm:px-8 sm:py-8 xl:px-8 xl:py-6 2xl:px-10 2xl:py-8">
            <div className="absolute inset-x-10 bottom-12 h-44 rounded-full bg-blue-200/30 blur-3xl sm:h-56" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center gap-2.5">
                <div className="flex size-13 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 sm:size-14">
                  <ShoppingCart className="size-6 sm:size-7" strokeWidth={2.1} />
                </div>
                <div>
                  <p className="text-[1.45rem] font-black tracking-tight text-slate-950 sm:text-[1.65rem]">
                    Avora <span className="text-blue-600">POS</span>
                  </p>
                  <p className="text-sm text-slate-600 sm:text-[0.95rem]">Sistema de punto de venta</p>
                </div>
              </div>

              <div className="mt-4 max-w-xl xl:mt-4 2xl:mt-5">
                <h1 className="max-w-lg text-[1.5rem] font-black leading-tight tracking-tight text-slate-950 sm:text-[1.5rem] xl:text-[1.55rem] 2xl:text-[1.75rem]">
                  Gestiona tu negocio, vende mas, controla todo.
                </h1>
                <p className="mt-2 max-w-md text-sm leading-6 text-slate-600 sm:text-base xl:text-[15px] xl:leading-5.5 2xl:text-base 2xl:leading-6">
                  Solucion completa y facil de usar para tu punto de venta.
                </p>
              </div>

              <div className="relative mt-3 flex flex-1 items-center justify-center xl:mt-3">
                <div className="absolute inset-x-8 top-1/2 h-[62%] -translate-y-1/2 rounded-[40px] bg-gradient-to-br from-blue-100/90 via-white/50 to-blue-50/80 blur-sm" />
                <Image
                  src="/assets/pos-asset.webp"
                  alt="Ilustracion del sistema POS con monitor, impresora y terminal de cobro"
                  width={1320}
                  height={909}
                  priority
                  className="relative z-10 h-auto w-full max-w-[250px] object-contain xl:max-w-[300px] 2xl:max-w-[500px]"
                />
              </div>

              <div className="relative z-10 mt-3 hidden gap-2 [@media(min-width:1536px)_and_(min-height:900px)]:grid [@media(min-width:1536px)_and_(min-height:900px)]:grid-cols-3 [@media(min-width:1536px)_and_(min-height:900px)]:gap-2.5">
                {featureList.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-white/70 bg-white/65 p-3 shadow-[0_14px_32px_rgba(148,163,184,0.12)] backdrop-blur xl:p-2.5 2xl:p-3.5"
                    >
                      <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 xl:size-9 2xl:size-11">
                        <Icon className="size-5.5 xl:size-4.5 2xl:size-5.5" strokeWidth={2.1} />
                      </div>
                      <p className="mt-2 text-[12px] font-bold text-slate-900 sm:text-[13px] xl:text-[11px] 2xl:text-[13px]">{feature.title}</p>
                      <p className="mt-1 text-[12px] leading-4.5 text-slate-500 xl:text-[10px] xl:leading-4 2xl:text-[12px] 2xl:leading-4.5">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white px-5 py-6 sm:px-8 sm:py-8 xl:px-10 xl:py-6 2xl:px-12 2xl:py-8">
            <div className="mx-auto flex h-full w-full max-w-xl flex-col justify-center">
              <div>
                <h2 className="text-[2rem] font-black tracking-tight text-slate-950 sm:text-[2.3rem] xl:text-[2.15rem] 2xl:text-[2.75rem]">
                  Iniciar sesion
                </h2>
                <p className="mt-2 text-base text-slate-500 sm:text-lg xl:text-base 2xl:text-lg">
                  Ingresa tus credenciales para continuar
                </p>
              </div>

              <form className="mt-6 space-y-3.5 xl:mt-5 xl:space-y-3 2xl:mt-7 2xl:space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-slate-900"
                  >
                    Usuario o correo electronico
                  </label>
                  <div className="flex h-13 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm shadow-slate-200/50 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 xl:h-12 2xl:h-13">
                    <User className="size-4.5 shrink-0 text-slate-400" strokeWidth={2.2} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="w-full border-0 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
                      placeholder="usuario@ejemplo.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-slate-900"
                  >
                    Contrasena
                  </label>
                  <div className="flex h-13 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm shadow-slate-200/50 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 xl:h-12 2xl:h-13">
                    <ShieldCheck className="size-4.5 shrink-0 text-slate-400" strokeWidth={2.2} />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      className="w-full border-0 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
                      placeholder="Tu contrasena"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="text-slate-400 transition hover:text-slate-600"
                      aria-label={showPassword ? "Ocultar contrasena" : "Mostrar contrasena"}
                    >
                      {showPassword ? (
                        <EyeOff className="size-4.5" strokeWidth={2.2} />
                      ) : (
                        <Eye className="size-4.5" strokeWidth={2.2} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between xl:text-[13px] 2xl:text-sm">
                  <label className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Recordarme</span>
                  </label>

                  <a
                    href="mailto:soporte@avora.mx?subject=Recuperar%20contrasena"
                    className="font-semibold text-blue-600 transition hover:text-blue-700"
                  >
                    Olvidaste tu contrasena?
                  </a>
                </div>

                <Button
                  type="submit"
                  className="h-13 w-full rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-base font-bold shadow-[0_20px_38px_rgba(37,99,235,0.3)] transition hover:from-blue-800 hover:via-blue-700 hover:to-blue-600 xl:h-12 2xl:h-13"
                >
                  <ArrowRight className="size-4.5" strokeWidth={2.2} />
                  Iniciar sesion
                </Button>
              </form>

              <div className="mt-5 xl:mt-4 2xl:mt-7">
                <div className="flex items-center gap-3 text-sm text-slate-400 xl:text-[13px] 2xl:text-sm">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span>o continuar con</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    className="flex h-13 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 xl:h-12 xl:text-[15px] 2xl:h-13 2xl:text-base"
                  >
                    <span className="text-xl leading-none text-[#ea4335]">G</span>
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex h-13 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-base font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 xl:h-12 xl:text-[15px] 2xl:h-13 2xl:text-base"
                  >
                    <span className="grid grid-cols-2 gap-0.5">
                      <span className="block size-2 bg-[#f25022]" />
                      <span className="block size-2 bg-[#7fba00]" />
                      <span className="block size-2 bg-[#00a4ef]" />
                      <span className="block size-2 bg-[#ffb900]" />
                    </span>
                    Microsoft
                  </button>
                </div>
              </div>

              <p className="mt-5 text-center text-base text-slate-500 xl:mt-4 xl:text-[15px] 2xl:mt-7 2xl:text-base">
                No tienes cuenta?{" "}
                <a
                  href="mailto:soporte@avora.mx?subject=Solicitud%20de%20acceso"
                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                >
                  Contacta al administrador
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-1 px-4 text-center text-[11px] text-slate-500 sm:flex-row sm:gap-2.5 sm:text-xs 2xl:gap-3 2xl:text-sm">
          <p>Avora POS © 2024</p>
          <span className="hidden sm:inline">•</span>
          <p>Todos los derechos reservados</p>
          <span className="hidden sm:inline">•</span>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </section>
  );
}
