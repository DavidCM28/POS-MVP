import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

export function VentasSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">TPV y carrito</span>
        <Badge>Mock</Badge>
      </CardContent>
    </Card>
  );
}
