import { create } from "zustand";

export const useStore = create((set) => ({
    isLoggedin: false,
    login: () => set({ isLoggedin: true }),
    logout: () => set({ isLoggedin: false })
}));