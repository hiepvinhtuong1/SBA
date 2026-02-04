import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import authService from '../services/auth.service';
import { useLoadingStore } from '@/shared/store.js/loading.store';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            // Action: Xử lý đăng nhập
            loginAction: async (email, password) => {
                // Bật Spinner toàn cục
                useLoadingStore.getState().setGlobalLoading(true);

                try {
                    const users = await authService.login(email, password);

                    if (users && users.length > 0) {
                        const userData = users[0];
                        set({
                            user: userData,
                            isAuthenticated: true
                        });
                        return { success: true, user: userData };
                    } else {
                        return { success: false, message: "Invalid email or password!" };
                    }
                } catch (error) {
                    console.error("Login Error:", error);
                    return { success: false, message: "Server connection error!" };
                } finally {
                    // Tắt Spinner toàn cục dù thành công hay thất bại
                    useLoadingStore.getState().setGlobalLoading(false);
                }
            },

            // Action: Đăng xuất
            logoutAction: () => {
                set({ user: null, isAuthenticated: false });
                localStorage.removeItem('auth-storage');
            },
        }),
        {
            name: 'auth-storage',
            // Chỉ lưu thông tin cần thiết vào localStorage
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated
            }),
        }
    )
);