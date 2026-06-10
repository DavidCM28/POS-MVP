import { AuthStatus } from "@/modules/auth";
import { AppShell } from "@/shared/components/layout/app-shell";

export default function AuthPage() {
  return (
    <AppShell>
      <AuthStatus />
    </AppShell>
  );
}
