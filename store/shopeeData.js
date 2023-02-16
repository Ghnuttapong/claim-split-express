import { create } from "zustand";

const useShopeeStore = create(set => ({
    shopee: [],
    setShopee: (input) => set({ kerrys: [...state.kerrys, input] }) 
}))

export default useShopeeStore;