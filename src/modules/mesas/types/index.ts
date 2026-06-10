export type DiningTableStatus = "available" | "occupied" | "reserved" | "disabled";

export type DiningTable = {
  id: string;
  name: string;
  seats: number;
  status: DiningTableStatus;
  currentOrderId?: string;
};
