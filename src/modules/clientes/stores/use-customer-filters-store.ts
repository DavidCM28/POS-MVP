import { create } from "zustand";

type CustomerFiltersState = {
  search: string;
  setSearch: (search: string) => void;
};

export const useCustomerFiltersStore = create<CustomerFiltersState>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
