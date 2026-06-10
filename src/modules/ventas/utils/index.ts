import type { SaleLine } from "@/modules/ventas/types";

export function calculateSaleSubtotal(lines: SaleLine[]) {
  return lines.reduce((total, line) => total + line.quantity * line.unitPrice, 0);
}

export function calculateSaleTotal(lines: SaleLine[]) {
  return calculateSaleSubtotal(lines);
}
