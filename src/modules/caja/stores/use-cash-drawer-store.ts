import { create } from "zustand";

type CashDrawerState = {
  isMovementSheetOpen: boolean;
  setMovementSheetOpen: (isMovementSheetOpen: boolean) => void;
};

export const useCashDrawerStore = create<CashDrawerState>((set) => ({
  isMovementSheetOpen: false,
  setMovementSheetOpen: (isMovementSheetOpen) => set({ isMovementSheetOpen }),
}));
