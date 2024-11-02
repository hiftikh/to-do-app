import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension";

export interface ThemeState {
  themeMode?: string;
}

interface ThemeStateAction {
  setThemeMode: (newTheme: string) => void;
}

const useThemeStore = create<ThemeState & ThemeStateAction>()(
  devtools(
    persist(
      (set) => ({
        themeMode: "light",
        setThemeMode: (newTheme) => {
          set({ themeMode: newTheme });
        },
      }),
      { name: "themeState" }
    )
  )
);

export default useThemeStore;
