import type { CashMovement } from "@/modules/caja/types";

export function calculateCashMovementsBalance(movements: CashMovement[]) {
  return movements.reduce((balance, movement) => {
    return movement.type === "in"
      ? balance + movement.amount
      : balance - movement.amount;
  }, 0);
}
