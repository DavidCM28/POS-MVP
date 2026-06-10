import type { DiningTable } from "@/modules/mesas/types";

export function getOccupiedTables(tables: DiningTable[]) {
  return tables.filter((table) => table.status === "occupied");
}
