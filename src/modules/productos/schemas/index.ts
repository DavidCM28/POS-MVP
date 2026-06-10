import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  sku: z.string().min(2),
  categoryId: z.string().min(1),
  price: z.number().nonnegative(),
  stock: z.number().int().nonnegative(),
  isActive: z.boolean().default(true),
});

export type ProductInput = z.infer<typeof productSchema>;
