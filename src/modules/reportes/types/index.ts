export type DailyKpi = {
  label: string;
  value: string;
  change: string;
};

export type SalesReport = {
  totalSales: number;
  tickets: number;
  averageTicket: number;
  topProduct: string;
};
