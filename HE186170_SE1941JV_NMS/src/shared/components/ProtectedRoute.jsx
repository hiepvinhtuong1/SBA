import { useAuthStore } from "@/feature/auth/store/auth.store";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
	const { isAuthenticated, user } = useAuthStore();

	// 1. Kiểm tra đăng nhập
	if (!isAuthenticated) {
		return <Navigate to="/admin/login" replace />;
	}

	// 2. Kiểm tra quyền (nếu route có yêu cầu role cụ thể)
	if (allowedRoles && !allowedRoles.includes(user?.AccountRole)) {
		// Nếu không đủ quyền, đá về trang news (trang chung) hoặc trang 403
		return <Navigate to="/admin/news" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
