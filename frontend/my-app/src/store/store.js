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

export const useAdminStore = create((set) => ({
    admin: JSON.parse(localStorage.getItem("admin")) || null,

  login: (adminData) => {
    localStorage.setItem("admin", JSON.stringify(adminData));
    set({ admin: adminData });
  },

  logout: () => {
    localStorage.removeItem("admin");
    set({ admin: null });
  },
}));

export const useDoctorStore = create((set) => ({
  doctor: JSON.parse(localStorage.getItem("doctor")) || null,

  login: (doctorData) => {
    localStorage.setItem("doctor", JSON.stringify(doctorData));
    set({ doctor: doctorData });
  },

  logout: () => {
    localStorage.removeItem("doctor");
    set({ doctor: null });
  },
}));