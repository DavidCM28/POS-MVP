import { useQuery } from "@tanstack/react-query";
import type { CashShift } from "@/modules/caja/types";

const cashShiftMock: CashShift = {
  id: "cash-1",
  status: "open",
  openedAt: "2026-06-10T08:00:00.000Z",
  initialAmount: 1500,
  movements: [],
};

export function useCashShift() {
  return useQuery({
    queryKey: ["caja", "current-shift"],
    queryFn: async () => cashShiftMock,
  });
}
