import { useQuery } from "@tanstack/react-query";
import type { Sale } from "@/modules/ventas/types";

const salesHistoryMock: Sale[] = [
  {
    id: "sale-1001",
    createdAt: "2026-06-10T09:35:00.000Z",
    paymentMethod: "card",
    lines: [
      { productId: "prod-espresso", name: "Espresso", quantity: 2, unitPrice: 38 },
      { productId: "prod-panini", name: "Panini", quantity: 1, unitPrice: 95 },
    ],
  },
];

export function useSalesHistory() {
  return useQuery({
    queryKey: ["ventas", "history"],
    queryFn: async () => salesHistoryMock,
  });
}
