import { NavLink } from "react-router-dom";
import {
	LayoutDashboard,
	FileText,
	Layers,
	BarChart3,
	Settings,
	Users,
	BookOpen,
} from "lucide-react";

const navItems = [
	{ path: "/", label: "Overview", icon: LayoutDashboard },
	{ path: "/news", label: "News Management", icon: FileText },
	{ path: "/categories", label: "Categories", icon: Layers },
	{ path: "/tags", label: "Tags", icon: BookOpen },
	{ path: "/users", label: "User Directory", icon: Users },
];

export const Sidebar = ({ isOpen, toggleSidebar }) => {
	return (
		<>
			{/* Mobile Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={toggleSidebar}
				/>
			)}

			<aside
				className={`h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-transparent z-50 flex flex-col p-6 space-y-2 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
			>
				<div className="text-lg font-black text-primary mb-8 tracking-tighter flex justify-between items-center">
					<span>FUNews Admin</span>
					<button
						className="md:hidden text-on-surface-variant"
						onClick={toggleSidebar}
					>
						&times;
					</button>
				</div>
				<nav className="flex-grow space-y-1">
					{navItems.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							onClick={() => {
								if (window.innerWidth < 768) {
									toggleSidebar();
								}
							}}
							className={({ isActive }) =>
								`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 ease-in-out font-medium text-sm uppercase tracking-widest ${
									isActive
										? "bg-surface-container-lowest text-primary shadow-sm"
										: "text-on-surface-variant hover:bg-surface-container-high"
								}`
							}
						>
							<item.icon className="w-5 h-5" />
							<span>{item.label}</span>
						</NavLink>
					))}
				</nav>
				<div className="bg-outline-variant/15 w-full h-[1px] my-4"></div>
				<NavLink
					to="/settings"
					onClick={() => {
						if (window.innerWidth < 768) {
							toggleSidebar();
						}
					}}
					className={({ isActive }) =>
						`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 ease-in-out font-medium text-sm uppercase tracking-widest ${
							isActive
								? "bg-surface-container-lowest text-primary shadow-sm"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<Settings className="w-5 h-5" />
					<span>Settings</span>
				</NavLink>
			</aside>
		</>
	);
};
