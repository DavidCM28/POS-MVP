import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function ClientesSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-500">CRM ligero e historial de compras.</p>
      </CardContent>
    </Card>
  );
}
