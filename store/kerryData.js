import { create } from "zustand";

const useKerryStore = create(set => ({
    kerrys: [],
    setKerrys: (input) => set({ kerrys: [...state.kerrys, input] }) 
}))

export default useKerryStore;