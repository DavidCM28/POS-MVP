import type { Customer } from "@/modules/clientes/types";

export function getCustomerDisplayName(customer: Customer) {
  return customer.name.trim();
}
