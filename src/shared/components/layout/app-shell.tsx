"use client";

import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/shared/utils/cn";
import {
  BarChart3,
  Bell,
  Calendar,
  Store,
  ChevronDown,
  ChevronLeft,
  CircleUserRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  ShoppingBag,
  Tags,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { useAuthStore } from "@/modules/auth";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type AppShellProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  branchName?: string;
  notificationCount?: number;
  profileRoleLabel?: string;
  onLogout?: () => void;
};

const navigation = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Negocio", href: "/negocio", icon: Store },
  { label: "Caja", href: "/caja", icon: ShoppingBag },
  { label: "Productos", href: "/productos", icon: Tags },
  { label: "Ventas", href: "/ventas", icon: ShoppingCart },
  { label: "Reportes", href: "/reportes", icon: BarChart3 },
  { label: "Clientes", href: "/clientes", icon: Users },
  { label: "Configuracion", href: "/auth", icon: Settings },
];

function getCurrentDateInfo() {
  const now = new Date();

  return {
    dateLabel: new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(now),
    year: now.getFullYear(),
  };
}

export function AppShell({
  children,
  title = "Dashboard",
  subtitle = "Resumen general del punto de venta",
  branchName,
  notificationCount = 0,
  profileRoleLabel = "Dueno del negocio",
  onLogout,
}: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const session = useAuthStore((state) => state.session);
  const setSession = useAuthStore((state) => state.setSession);
  const currentDate = getCurrentDateInfo();

  const profileName = session?.user.name ?? profileRoleLabel;
  const branchLabel = branchName ?? "Sucursal";
  const hasNotifications = notificationCount > 0;

  function handleLogout() {
    onLogout?.();
    setSession(null);
    setIsProfileMenuOpen(false);
    router.replace("/auth");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/35 opacity-0 backdrop-blur-[1px] transition-opacity",
          isSidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none",
        )}
        aria-hidden
        onClick={() => setIsSidebarOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[286px] border-r border-slate-200 bg-white shadow-2xl shadow-slate-900/20 transition-transform duration-200 sm:w-[304px]",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Navegacion principal"
      >
        <div className="flex h-[96px] items-center px-7">
          <div className="flex flex-1 items-center justify-between gap-4">
            <p className="text-2xl font-extrabold tracking-tight text-[#0b1533]">
              POS MVP
            </p>
            <button
              className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-[#0b1533] hover:bg-slate-50"
              type="button"
              aria-label="Cerrar navegacion"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        <nav className="space-y-2 px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "flex h-12 items-center gap-4 rounded-lg px-4 text-[14px] font-semibold text-[#182646] transition-colors hover:bg-blue-50 hover:text-blue-700",
                  isActive && "bg-blue-50 text-blue-700",
                )}
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon className="size-5" strokeWidth={2.2} aria-hidden />
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 px-8 py-8">
          <button className="flex items-center gap-4 text-sm font-medium text-[#182646]">
            <ChevronLeft className="size-5" aria-hidden />
            Colapsar
          </button>
        </div>
      </aside>

      <div>
        <header className="fixed inset-x-0 top-0 z-30 border-b border-slate-100 bg-slate-50/95 px-4 py-4 shadow-sm shadow-slate-200/40 backdrop-blur sm:px-5 lg:px-7 2xl:px-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <button
                className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0b1533] shadow-sm hover:bg-slate-50"
                type="button"
                aria-label="Abrir navegacion"
                aria-expanded={isSidebarOpen}
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="size-5" aria-hidden />
              </button>
              <div className="min-w-0">
                <h1 className="text-2xl font-extrabold tracking-tight text-[#0b1533] sm:text-3xl">
                  {title}
                </h1>
                <p className="mt-1 text-sm text-slate-500 sm:text-base">
                  {subtitle}
                </p>
              </div>
            </div>

          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-[minmax(220px,1fr)_auto_auto_auto] xl:w-auto xl:grid-cols-[280px_auto_auto_auto_auto]">
            <label className="col-span-2 flex h-12 min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-slate-400 shadow-sm sm:col-span-1">
              <Search className="size-5" aria-hidden />
              <input
                className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                placeholder="Buscar..."
              />
            </label>

            <button className="flex h-12 min-w-0 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0b1533] shadow-sm">
              <Store className="size-5" aria-hidden />
              <span className="hidden sm:inline">{branchLabel}</span>
              <span className="sm:hidden">Sucursal</span>
              <ChevronDown className="size-4 text-slate-500" aria-hidden />
            </button>

            <button className="flex h-12 min-w-0 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0b1533] shadow-sm">
              <Calendar className="size-5" aria-hidden />
              <span>{currentDate.dateLabel}</span>
              <ChevronDown className="size-4 text-slate-500" aria-hidden />
            </button>

            <button className="relative flex size-12 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0b1533] shadow-sm">
              <Bell className="size-5" aria-hidden />
              {hasNotifications && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">
                  {notificationCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                className="flex h-12 w-full min-w-0 items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0b1533] shadow-sm"
                type="button"
                aria-expanded={isProfileMenuOpen}
                onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
              >
                <CircleUserRound className="size-5" aria-hidden />
                <span className="truncate">{profileName}</span>
                <ChevronDown className="size-4 shrink-0 text-slate-500" aria-hidden />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-14 z-40 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                  <div className="flex items-start gap-3 px-4 py-3">
                    <UserCog className="mt-0.5 size-5 shrink-0 text-blue-700" aria-hidden />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#0b1533]">
                        {profileName}
                      </p>
                      <p className="text-xs font-medium text-slate-500">
                        {profileRoleLabel}
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <button
                    className="flex h-11 w-full items-center gap-3 px-4 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                    type="button"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4" aria-hidden />
                    Cerrar sesion
                  </button>
                </div>
              )}
            </div>
          </div>
          </div>

        </header>

        <main className="px-4 pb-5 pt-[220px] sm:px-5 sm:pt-[178px] lg:px-7 xl:pt-[130px] 2xl:px-8">
          {children}
        </main>

        <footer className="pb-7 pt-5 text-center text-sm text-slate-400">
          <Separator className="mb-6 opacity-0" />
          (c) {currentDate.year} POS MVP. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
}
