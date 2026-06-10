import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { diningTablesMock } from "@/modules/mesas/hooks/use-dining-tables";

const statusTone = {
  available: "success",
  occupied: "warning",
  reserved: "muted",
  disabled: "muted",
} as const;

export function MesasOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mesas</CardTitle>
        <CardDescription>Modulo opcional listo para plugin futuro.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3">
        {diningTablesMock.map((table) => (
          <div
            key={table.id}
            className="flex items-center justify-between rounded-md border border-zinc-200 p-3"
          >
            <div>
              <p className="text-sm font-medium">{table.name}</p>
              <p className="text-xs text-zinc-500">{table.seats} lugares</p>
            </div>
            <Badge tone={statusTone[table.status]}>{table.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
