import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "@/shared/components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayouts = () => {
	return (
		<Container
			fluid
			className="p-0 overflow-hidden"
			style={{ height: "100vh" }}
		>
			<Row className="g-0" style={{ height: "100%" }}>
				{/* Cột Sidebar: Cố định hoàn toàn */}
				<Col
					md={3}
					lg={2}
					style={{
						height: "100vh",
						position: "sticky",
						top: 0,
						zIndex: 1000,
						backgroundColor: "#1a1a1a", // Đảm bảo màu nền đồng bộ với Sidebar
					}}
				>
					<Sidebar />
				</Col>

				{/* Cột Nội dung: Có thanh cuộn riêng */}
				<Col
					md={9}
					lg={10}
					style={{
						height: "100vh",
						overflowY: "auto",
						backgroundColor: "#f8f9fa",
					}}
				>
					<div className="p-4">
						<Outlet />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default AdminLayouts;
