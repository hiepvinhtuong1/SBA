import { useState } from "react";
import { PLANTS_DATA } from "../data/plants";
import {
	Button,
	Card,
	Col,
	Container,
	Nav,
	Navbar,
	Row,
	Modal,
} from "react-bootstrap";
const Orchilds = () => {
	const [show, setShow] = useState(false);
	const [selectedOrchild, setSelectedOrchid] = useState(null);
	const handleClose = () => setShow(false);
	const handleShow = (orChild) => {
		setSelectedOrchid(orChild); // Cập nhật dữ liệu trước
		setShow(true); // Mở modal sau
	};

	return (
		<>
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
										onClick={() => handleShow(plant)}
									>
										Detail
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</div>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>
						{selectedOrchild ? selectedOrchild?.title : ""}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedOrchild ? (
						<div>
							<img
								src={selectedOrchild.image}
								alt={selectedOrchild.title}
								style={{
									width: "100%",
								}}
							/>
							<p className="mt-4">
								{selectedOrchild.description}
							</p>
						</div>
					) : (
						<p>Loading detai</p>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Orchilds;
