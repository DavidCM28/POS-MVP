import { create } from "zustand";
import type { SaleLine } from "@/modules/ventas/types";
import { calculateSaleTotal } from "@/modules/ventas/utils";

type CartState = {
  lines: SaleLine[];
  addLine: (line: SaleLine) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  lines: [],
  addLine: (line) =>
    set((state) => ({
      lines: [...state.lines, line],
    })),
  clearCart: () => set({ lines: [] }),
  total: () => calculateSaleTotal(get().lines),
}));
