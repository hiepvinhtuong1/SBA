import { Navigate } from "react-router-dom";
import AdminLayouts from "../layouts/AdminLayouts";
import CategoryList from "@/feature/categories/pages/CategoryList";
import categoryService from "@/feature/categories/services/category.service";
import NewsList from "@/feature/news/pages/NewsList";
import newsService from "@/feature/news/services/news.service";
import LoginPage from "@/feature/auth/pages/LoginPage";
import ProtectedRoute from "@/shared/components/ProtectedRoute"; // Import guard
import axiosClient from "@/shared/services/axiosClient";
import Dashboard from "@/feature/dashboard.jsx/pages/Dashboard";
import accountService from "@/feature/accounts/services/account.service";
import AccountList from "@/feature/accounts/pages/AccountList";

const adminRoutes = [
	{
		path: "/admin/login",
		element: <LoginPage />,
	},
	{
		path: "/admin",
		element: <AdminLayouts />,
		children: [
			{
				index: true,
				element: <Dashboard />,
				loader: async () => {
					const [news, cats, tags, accounts] = await Promise.all([
						axiosClient.get("/newsArticles"),
						axiosClient.get("/categories"),
						axiosClient.get("/tags"),
						axiosClient.get("/systemAccounts"),
					]);
					return {
						news: news.data,
						categories: cats.data,
						tags: tags.data,
						accounts: accounts.data,
					};
				},
			},
			// NHÓM 1: Cả Admin (1) và Staff (2) đều vào được
			{
				element: <ProtectedRoute allowedRoles={[1, 2]} />,
				children: [
					{
						path: "news",
						element: <NewsList />,
						loader: newsService.findAll,
					},
				],
			},
			// NHÓM 2: CHỈ Admin (1) mới vào được
			{
				element: <ProtectedRoute allowedRoles={[1]} />,
				children: [
					{
						path: "categories",
						element: <CategoryList />,
						loader: categoryService.findAll,
					},
					{
						path: "users",
						element: <AccountList />,
						loader: accountService.findAll, // Gọi service lấy danh sách tài khoản
					},
				],
			},
		],
	},
];
export default adminRoutes;
