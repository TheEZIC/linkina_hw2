import {create} from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {BaseUser} from "../backend/types/BaseUser";

export type UserStore = {
  user?: BaseUser;
  setUser: (user: BaseUser) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      setUser: (user: BaseUser) => {
        set({ user });
      },
      removeUser: () => {
        set({ user: undefined });
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
