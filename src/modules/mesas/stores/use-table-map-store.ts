import { create } from "zustand";

type TableMapState = {
  selectedTableId: string | null;
  selectTable: (selectedTableId: string | null) => void;
};

export const useTableMapStore = create<TableMapState>((set) => ({
  selectedTableId: null,
  selectTable: (selectedTableId) => set({ selectedTableId }),
}));
