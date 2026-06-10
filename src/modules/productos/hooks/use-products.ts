import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/modules/productos/types";

export const productsMock: Product[] = [
  {
    id: "prod-espresso",
    name: "Espresso",
    sku: "CAF-ESP",
    categoryId: "cat-cafe",
    price: 38,
    stock: 120,
    isActive: true,
  },
  {
    id: "prod-panini",
    name: "Panini",
    sku: "COC-PAN",
    categoryId: "cat-comida",
    price: 95,
    stock: 18,
    isActive: true,
  },
];

export function useProducts() {
  return useQuery({
    queryKey: ["productos", "list"],
    queryFn: async () => productsMock,
  });
}
