import { z } from "zod";

export const cashMovementSchema = z.object({
  type: z.enum(["in", "out"]),
  amount: z.number().positive(),
  concept: z.string().min(3),
});

export const openCashShiftSchema = z.object({
  initialAmount: z.number().nonnegative(),
});

export type CashMovementInput = z.infer<typeof cashMovementSchema>;
export type OpenCashShiftInput = z.infer<typeof openCashShiftSchema>;
