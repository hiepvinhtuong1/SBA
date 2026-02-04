import React from "react";
import {
	Badge,
	Button,
	Col,
	Form,
	FormLabel,
	Modal,
	Row,
	Stack,
} from "react-bootstrap";
import Select from "react-select";
const customStyles = {
	control: (base, state) => ({
		...base,
		borderColor: state.isFocused ? "#f27123" : "#dee2e6", // Viền cam khi focus
		boxShadow: state.isFocused ? "0 0 0 1px #f27123" : "none", // ĐỔI BOX-SHADOW Ở ĐÂY
		"&:hover": {
			borderColor: "#f27123", // Viền cam khi hover
		},
	}),
	// Tùy chỉnh màu sắc cho các chip (Tags) đã chọn
	multiValue: (base) => ({
		...base,
		backgroundColor: "rgba(242, 113, 35, 0.1)",
	}),
	multiValueLabel: (base) => ({
		...base,
		color: "#f27123",
	}),
	multiValueRemove: (base) => ({
		...base,
		color: "#f27123",
		"&:hover": {
			backgroundColor: "#f27123",
			color: "white",
		},
	}),
};
const ReadNewsModal = ({ show, handleClose, selectedNews }) => {
	console.log("🚀 ~ ReadNewsModal ~ selectedNews:", selectedNews);
	if (!selectedNews) return null;

	return (
		<Modal
			size="lg"
			centered
			dialogClassName="fpt-modal-dialog"
			contentClassName="fpt-modal-content"
			show={show}
			onHide={handleClose}
		>
			<Modal.Header closeButton className="fpt-modal-header">
				<Modal.Title className="fw-bold ">
					<span className="text-fpt-orange ">
						{selectedNews?.NewsTitle}
					</span>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="fpt-modal-body">
				<Stack gap={3}>
					{/* Thông tin tiêu đề và Headline */}
					<Form.Group>
						<FormLabel className="fw-bold small text-uppercase text-muted">
							News Title
						</FormLabel>
						<Form.Control
							readOnly
							value={selectedNews.NewsTitle || ""}
							className="fpt-input bg-light"
						/>
					</Form.Group>

					<Form.Group>
						<FormLabel className="fw-bold small text-uppercase text-muted">
							Headline
						</FormLabel>
						<Form.Control
							readOnly
							value={selectedNews.Headline || ""}
							className="fpt-input bg-light"
						/>
					</Form.Group>

					<Form.Group>
						<FormLabel className="fw-bold small text-uppercase text-muted">
							Category
						</FormLabel>
						<Form.Control
							readOnly
							value={selectedNews.CategoryName || "N/A"}
							className="fpt-input bg-light"
						/>
					</Form.Group>

					{/* Hiển thị Tags bằng react-select (Disabled) */}
					<Form.Group>
						<FormLabel className="fw-bold small text-uppercase text-muted">
							Tags
						</FormLabel>
						<Select
							isMulti
							isDisabled
							styles={customStyles}
							value={selectedNews.tags?.map((t) => ({
								value: t.id,
								label: t.TagName,
							}))}
						/>
					</Form.Group>

					<Form.Group>
						<FormLabel className="fw-bold small text-uppercase text-muted">
							Content
						</FormLabel>
						<Form.Control
							as="textarea"
							rows={4}
							readOnly
							value={selectedNews.NewsContent || ""}
							className="fpt-input bg-light"
						/>
					</Form.Group>

					{/* PHẦN THÔNG TIN KIỂM SOÁT (AUDIT INFO) */}
					<hr className="my-2 opacity-25" />
					<Row className="">
						<Col md={6}>
							<div className="mb-2">
								<FormLabel className="fw-bold small text-uppercase text-muted d-block mb-1">
									Created By
								</FormLabel>
								<div className="small text-dark fw-semibold">
									{selectedNews.AuthorName || "Unknown"}
								</div>
								<div className="text-muted small">
									Date: {selectedNews.CreatedDate}
								</div>
							</div>
						</Col>
						<Col md={6}>
							<div>
								<FormLabel className="fw-bold small text-uppercase text-muted d-block mb-1">
									Last Updated By
								</FormLabel>
								<div className="small text-dark fw-semibold">
									{selectedNews.EditorName ||
										selectedNews.AuthorName}
								</div>
								<div className="text-muted small">
									Date: {selectedNews.ModifiedDate}
								</div>
							</div>
						</Col>
					</Row>
					<Form.Group>
						<FormLabel className="fw-bold small text-uppercase text-muted">
							Status
						</FormLabel>
						<div>
							<span
								className={`badge ${selectedNews.NewsStatus === 1 ? "bg-success" : "bg-secondary"} px-3 py-2`}
							>
								{selectedNews.NewsStatus === 1
									? "Published"
									: "Draft"}
							</span>
						</div>
					</Form.Group>
				</Stack>
			</Modal.Body>
			<Modal.Footer className="fpt-modal-footer">
				<Button
					variant="secondary"
					onClick={handleClose}
					className="px-4 fw-semibold"
				>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ReadNewsModal;
