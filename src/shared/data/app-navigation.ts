import type { AppNavigationItem } from "@/shared/types/app-navigation";

export const appNavigation: AppNavigationItem[] = [
  { label: "Ventas", href: "/ventas" },
  { label: "Productos", href: "/productos" },
  { label: "Clientes", href: "/clientes" },
  { label: "Caja", href: "/caja" },
  { label: "Mesas", href: "/mesas", feature: "mesas" },
  { label: "Reportes", href: "/reportes" },
];
