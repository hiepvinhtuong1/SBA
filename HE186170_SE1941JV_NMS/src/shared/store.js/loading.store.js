import { create } from 'zustand';

export const useLoadingStore = create((set) => ({
    isLoading: false,
    // Hàm này giúp bật/tắt spinner từ bất kỳ đâu
    setGlobalLoading: (status) => set({ isLoading: status }),
}));