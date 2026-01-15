import "bootstrap/dist/css/bootstrap.min.css";
import {
	Button,
	Card,
	Col,
	Container,
	Nav,
	Navbar,
	Row,
} from "react-bootstrap";
import { PLANTS_DATA } from "./data/plants";
function App() {
	return (
		<>
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

			<div
				style={{
					width: "80%",
					margin: "auto",
				}}
			>
				<Row>
					{PLANTS_DATA.map((plant) => (
						<Col
							xl={3}
							md={4}
							sm={6}
							xs={12}
							key={plant.id}
							className="mb-4"
						>
							<Card className="h-100 shadow-sm">
								<Card.Img
									variant="top"
									src={plant.image}
									style={{
										height: "400px",
										objectFit: "cover",
									}}
								/>
								<Card.Body className="d-flex flex-column">
									<Card.Title>{plant.title}</Card.Title>
									<Card.Text>
										Category: {plant.category}
									</Card.Text>
									<Button
										variant="primary"
										className="mt-auto"
										style={{ width: "120px" }}
									>
										Detail
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</>
	);
}

export default App;
