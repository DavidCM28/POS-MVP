import { MesasOverview } from "@/modules/mesas";
import { AppShell } from "@/shared/components/layout/app-shell";
import { featureFlags } from "@/shared/config/features";

export default function MesasPage() {
  return (
    <AppShell>
      {featureFlags.mesas ? (
        <MesasOverview />
      ) : (
        <p className="text-sm text-zinc-500">Modulo de mesas desactivado.</p>
      )}
    </AppShell>
  );
}
