import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
    persist(
        (set) => ({
            sidebar: localStorage.getItem("sidebar") ? JSON.parse(localStorage.getItem("sidebar")) : false,
            toggleSidebar: () => {
                set((state) => ({ sidebar: !state.sidebar }))

            }
        }),
        {
            name : "sidebar",
            getStorage: () => localStorage
        }
    )
);