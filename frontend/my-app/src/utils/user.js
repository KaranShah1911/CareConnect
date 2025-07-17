import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      isLoggedin: false,
      image: null,

      login: (image) => set({ isLoggedin: true, image }),
      logout: () => set({ isLoggedin: false, image: null }),

      setImage: (img) => set({ image: img }),
    }),
    {
      name: 'user-auth-store', // localStorage key
      partialize: (state) => ({
        isLoggedin: state.isLoggedin,
        image: state.image,
      }),
    }
  )
);
