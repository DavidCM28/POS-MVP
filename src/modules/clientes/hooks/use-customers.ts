import { useQuery } from "@tanstack/react-query";
import type { Customer } from "@/modules/clientes/types";

const customersMock: Customer[] = [
  {
    id: "customer-1",
    name: "Cliente mostrador",
    lastPurchaseAt: "2026-06-10T10:05:00.000Z",
  },
];

export function useCustomers() {
  return useQuery({
    queryKey: ["clientes", "list"],
    queryFn: async () => customersMock,
  });
}
