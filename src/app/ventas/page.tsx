import { VentasSummary } from "@/modules/ventas";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function VentasPage() {
  return (
    <AppShell>
      <VentasSummary />
    </AppShell>
  );
}
