import { create } from "zustand";

type AppShellState = {
  isSidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  setSidebarOpen: (isSidebarOpen: boolean) => void;
  setTheme: (theme: AppShellState["theme"]) => void;
};

export const useAppShellStore = create<AppShellState>((set) => ({
  isSidebarOpen: false,
  theme: "system",
  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setTheme: (theme) => set({ theme }),
}));
