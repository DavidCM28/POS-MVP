import { CajaSummary } from "@/modules/caja";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function CajaPage() {
  return (
    <AppShell title="Caja" subtitle="Punto de venta y cobro rapido">
      <CajaSummary />
    </AppShell>
  );
}
