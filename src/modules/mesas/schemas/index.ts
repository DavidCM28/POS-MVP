import { z } from "zod";

export const diningTableSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  seats: z.number().int().positive(),
  status: z.enum(["available", "occupied", "reserved", "disabled"]),
});

export type DiningTableInput = z.infer<typeof diningTableSchema>;
