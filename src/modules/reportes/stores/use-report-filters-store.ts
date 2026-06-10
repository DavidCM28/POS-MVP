import { create } from "zustand";

type ReportFiltersState = {
  from: string | null;
  to: string | null;
  setDateRange: (from: string | null, to: string | null) => void;
};

export const useReportFiltersStore = create<ReportFiltersState>((set) => ({
  from: null,
  to: null,
  setDateRange: (from, to) => set({ from, to }),
}));
