import { ClientesSummary } from "@/modules/clientes";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function ClientesPage() {
  return (
    <AppShell>
      <ClientesSummary />
    </AppShell>
  );
}
