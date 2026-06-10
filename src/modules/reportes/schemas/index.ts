import { z } from "zod";

export const reportDateRangeSchema = z.object({
  from: z.string().date(),
  to: z.string().date(),
});

export type ReportDateRangeInput = z.infer<typeof reportDateRangeSchema>;
