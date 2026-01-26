import React from "react";
import {
	Button,
	Card,
	Col,
	Container,
	Nav,
	Navbar,
	Row,
} from "react-bootstrap";
const NavbarHeader = () => {
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<div
				className="d-flex justify-content-between"
				style={{
					width: "80%",
					margin: "auto",
				}}
			>
				<Navbar.Brand href="#home">
					Single Page Application
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#home">Home</Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</div>
		</Navbar>
	);
};

export default NavbarHeader;
