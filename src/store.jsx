import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useStore = create(
    persist(
        (set) => ({
            isAuth: false,
            setAuth: () => set((state) => ({ isAuth: !state.isAuth })),
        }),
        {
           name: 'auth',
           storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useStore;