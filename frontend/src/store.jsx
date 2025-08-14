import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useStore = create(
    persist(
        (set, get) => ({
            isAuth: false,
            email: '',
            nickname: '',
            setNickname: (state) => set({nickname: state}),
            login: (state) => {
                set({ isAuth: true });
                set({email: state});
            },
            logout: () => {
                set({isAuth: false})
                localStorage.clear()
            }
        }),
        {
           name: 'auth',
           storage: createJSONStorage(() => localStorage),
           partialize: (state) => ({isAuth: state.isAuth, email: state.email})
        }
    )
)

export default useStore;