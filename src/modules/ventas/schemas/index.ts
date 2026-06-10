import { z } from "zod";

export const saleLineSchema = z.object({
  productId: z.string().min(1),
  name: z.string().min(1),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
});

export const saleSchema = z.object({
  id: z.string().optional(),
  createdAt: z.string().datetime().optional(),
  lines: z.array(saleLineSchema).min(1),
  paymentMethod: z.enum(["cash", "card", "transfer"]),
});

export type SaleInput = z.infer<typeof saleSchema>;
