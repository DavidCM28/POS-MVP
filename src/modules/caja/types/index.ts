export type CashRegisterStatus = "closed" | "open";

export type CashMovement = {
  id: string;
  type: "in" | "out";
  amount: number;
  concept: string;
  createdAt: string;
};

export type CashShift = {
  id: string;
  status: CashRegisterStatus;
  openedAt?: string;
  initialAmount: number;
  movements: CashMovement[];
};
