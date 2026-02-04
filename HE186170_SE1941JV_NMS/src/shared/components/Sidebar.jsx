import React from "react";
import { Image, Nav, Stack } from "react-bootstrap";
import {
	BoxArrowRight,
	Newspaper,
	People,
	Speedometer2,
} from "react-bootstrap-icons";
import { BiCategory } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import logoiImg from "@/assets/logo.png";
import "./Sidebar.css";
import { useAuthStore } from "@/feature/auth/store/auth.store";

const Sidebar = () => {
	const navigate = useNavigate();
	const { user, logoutAction } = useAuthStore();

	const handleLogout = () => {
		logoutAction();
		navigate("/admin/login");
	};

	return (
		<div className="sidebar-container d-flex flex-column p-3 text-white">
			{/* Header Logo */}
			<Stack
				direction="horizontal"
				gap={2}
				className="align-items-center mb-4"
			>
				<Image
					src={logoiImg}
					width={40}
					height={40}
					roundedCircle
					style={{ objectFit: "cover" }}
				/>
				<h4 className="fw-bold m-0 fs-5">FU News Admin</h4>
			</Stack>

			<hr className="opacity-25" />

			{/* Menu điều hướng */}
			<Nav className="mb-auto flex-column">
				<Nav.Link as={NavLink} to="/admin" end className="sidebar-link">
					<Speedometer2 className="me-3" /> Dashboard
				</Nav.Link>

				{/* PHÂN QUYỀN: Chỉ Admin (Role 1) mới thấy Categories và Users */}
				{user?.AccountRole === 1 && (
					<>
						<Nav.Link
							as={NavLink}
							to="/admin/categories"
							className="sidebar-link"
						>
							<BiCategory className="me-3" /> Categories
						</Nav.Link>

						<Nav.Link
							as={NavLink}
							to="/admin/users"
							className="sidebar-link"
						>
							<People className="me-3" /> Users
						</Nav.Link>
					</>
				)}

				{/* Cả Admin và Staff đều thấy News */}
				<Nav.Link
					as={NavLink}
					to="/admin/news"
					className="sidebar-link"
				>
					<Newspaper className="me-3" /> News
				</Nav.Link>
			</Nav>

			<hr className="opacity-25" />

			{/* Phần Logout */}
			<Nav className="flex-column">
				<Nav.Link
					onClick={handleLogout}
					className="text-white-50 sidebar-link d-flex align-items-center border-0"
					style={{ cursor: "pointer" }}
				>
					<BoxArrowRight className="me-3" size={20} /> Logout
				</Nav.Link>
			</Nav>
		</div>
	);
};

export default Sidebar;
