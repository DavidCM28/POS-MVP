import { useQuery } from "@tanstack/react-query";
import type { DiningTable } from "@/modules/mesas/types";

export const diningTablesMock: DiningTable[] = [
  { id: "table-1", name: "Mesa 1", seats: 2, status: "available" },
  { id: "table-2", name: "Mesa 2", seats: 4, status: "occupied", currentOrderId: "order-2" },
  { id: "table-3", name: "Barra", seats: 6, status: "reserved" },
];

export function useDiningTables() {
  return useQuery({
    queryKey: ["mesas", "map"],
    queryFn: async () => diningTablesMock,
  });
}
