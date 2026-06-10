import type { Product } from "@/modules/productos/types";

export function formatProductPrice(product: Pick<Product, "price">) {
  return new Intl.NumberFormat("es-MX", {
    currency: "MXN",
    style: "currency",
  }).format(product.price);
}

export function isLowStock(product: Pick<Product, "stock">) {
  return product.stock <= 5;
}
