import { ProductosSummary } from "@/modules/productos";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function ProductosPage() {
  return (
    <AppShell title="Productos" subtitle="Gestion de catalogo e inventario">
      <ProductosSummary />
    </AppShell>
  );
}
