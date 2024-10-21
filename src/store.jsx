import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useStore = create(
    persist(
        (set, get) => ({
            isAuth: false,
            login: () => set({ isAuth: true }),
            logout: () => {
                set({isAuth: false}),
                get().clearStorage();
            }
        }),
        {
           name: 'auth',
           storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useStore;