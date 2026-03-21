import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";
import AuthGuard from "../guards/AuthGuard";
import { Login } from "../../features/auth/pages/LoginPage";
import { Register } from "../../features/auth/pages/RegisterPage";
import { DashboardOverview } from "../../features/dashboard/pages/DashboardOverviewPage";
import { NewsManagement } from "../../features/news/pages/NewsManagementPage";
import { CategoryManagement } from "../../features/categories/pages/CategoryManagementPage";
import { UserManagement } from "../../features/users/pages/UserManagementPage";
import { TagManagement } from "../../features/tags/pages/TagManagementPage";
import { AlertTriangle } from "lucide-react";

// Inline Unauthorized Page
const Unauthorized = () => (
	<div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
		<div className="bg-error-container/20 p-6 rounded-full inline-flex">
			<AlertTriangle className="w-16 h-16 text-error" />
		</div>
		<h1 className="text-4xl font-black text-on-surface tracking-tight mt-4">Access Denied</h1>
		<p className="text-on-surface-variant text-lg">You do not have permission to view this page.</p>
	</div>
);

const router = createBrowserRouter([
	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
	{
		element: <MainLayout />,
		children: [
			{
				path: "/unauthorized",
				element: <Unauthorized />,
			},
			// Routes for both Admin (1) and Staff (2)
			{
				element: <AuthGuard allowedRoles={[1, 2]} />,
				children: [
					{
						path: "/",
						element: <DashboardOverview />,
					},
					{
						path: "/news",
						element: <NewsManagement />,
					},
				],
			},
			// Routes for Admin (1) only
			{
				element: <AuthGuard allowedRoles={[1]} />,
				children: [
					{
						path: "/categories",
						element: <CategoryManagement />,
					},
					{
						path: "/tags",
						element: <TagManagement />,
					},
					{
						path: "/users",
						element: <UserManagement />,
					},
					{
						path: "/settings",
						element: <div className="p-8 max-w-4xl mx-auto"><h1 className="text-4xl font-black tracking-tight text-on-surface mb-2">System Settings</h1><p className="text-on-surface-variant text-sm border-b border-outline-variant/10 pb-8 mb-8">Manage global configurations, API integrations, and newsroom policies.</p></div>,
					},
				],
			},
		],
	},
]);

export const AppRouter = () => {
	return <RouterProvider router={router} />;
};
