import { useQuery } from "@tanstack/react-query";
import type { SalesReport } from "@/modules/reportes/types";

export const dashboardReportMock: SalesReport = {
  totalSales: 12480,
  tickets: 86,
  averageTicket: 145,
  topProduct: "Espresso",
};

export function useDashboardReport() {
  return useQuery({
    queryKey: ["reportes", "dashboard"],
    queryFn: async () => dashboardReportMock,
  });
}
