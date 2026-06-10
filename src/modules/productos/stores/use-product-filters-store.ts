import { create } from "zustand";

type ProductFiltersState = {
  search: string;
  categoryId: string | null;
  setSearch: (search: string) => void;
  setCategoryId: (categoryId: string | null) => void;
};

export const useProductFiltersStore = create<ProductFiltersState>((set) => ({
  search: "",
  categoryId: null,
  setSearch: (search) => set({ search }),
  setCategoryId: (categoryId) => set({ categoryId }),
}));
