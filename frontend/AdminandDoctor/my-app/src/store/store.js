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
      name: "sidebar",
      getStorage: () => localStorage
    }
  )
);

export const useAdminStore = create(
  persist(
    (set) => ({
      admin: JSON.parse(localStorage.getItem("admin")) || null,

      login: (adminData) => {
        set({ admin: adminData });
      },

      logout: () => {
        set({ admin: null });
      },
    }),
    {
      name: "admin",
      getStorage: () => localStorage
    }
  )
);

export const useDoctorStore = create(
  persist(
    (set) => ({
      doctor: JSON.parse(localStorage.getItem("doctor")) || null,

      login: (doctorData) => {
        set({ doctor: doctorData });
      },

      logout: () => {
        set({ doctor: null });
      },
    }),
    {
      name: "doctor",
      getStorage: () => localStorage
    }
  )
);