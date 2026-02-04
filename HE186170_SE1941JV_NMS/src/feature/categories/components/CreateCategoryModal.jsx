import React from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CreateCategoryModal = ({ show, handleClose, onSubmit, categories }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			CategoryName: "",
			CategoryDescription: "",
			ParentCategoryID: "",
			isActive: 1,
		},
	});

	const onModalClose = () => {
		reset();
		handleClose();
	};

	const handleFormSubmit = (data) => {
		// Chuyển đổi kiểu dữ liệu trước khi gửi đi
		const formattedData = {
			...data,
			isActive: Number(data.isActive),
			ParentCategoryID: data.ParentCategoryID || null,
		};
		onSubmit(formattedData);
		onModalClose();
	};

	return (
		<Modal
			show={show}
			onHide={onModalClose}
			size="lg"
			centered // Căn giữa màn hình dọc
			dialogClassName="fpt-modal-dialog" // Class riêng để custom width
			contentClassName="fpt-modal-content" // Class riêng để bỏ border/đổ bóng
		>
			<Form onSubmit={handleSubmit(handleFormSubmit)}>
				<Modal.Header closeButton className="fpt-modal-header">
					<Modal.Title className="fw-bold text-dark">
						Create New Category
					</Modal.Title>
				</Modal.Header>

				<Modal.Body className="fpt-modal-body py-4">
					<Stack gap={3}>
						{/* Category Name */}
						<Form.Group controlId="formCategoryName">
							<Form.Label className="fw-bold small text-uppercase text-muted">
								Category Name
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter category name..."
								className={`fpt-input ${errors.CategoryName ? "is-invalid" : ""}`}
								{...register("CategoryName", {
									required: "Category name is required",
									minLength: {
										value: 3,
										message: "Minimum 3 characters",
									},
								})}
							/>
							{errors.CategoryName && (
								<Form.Control.Feedback type="invalid">
									{errors.CategoryName.message}
								</Form.Control.Feedback>
							)}
						</Form.Group>

						{/* Parent Category */}
						<Form.Group controlId="formParentCategory">
							<Form.Label className="fw-bold small text-uppercase text-muted">
								Parent Category (Optional)
							</Form.Label>
							<Form.Select
								className="fpt-input"
								{...register("ParentCategoryID")}
							>
								<option value="">
									None (Primary Category)
								</option>
								{categories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.CategoryName}
									</option>
								))}
							</Form.Select>
						</Form.Group>

						{/* Description */}
						<Form.Group controlId="formCategoryDescription">
							<Form.Label className="fw-bold small text-uppercase text-muted">
								Description
							</Form.Label>
							<Form.Control
								as="textarea"
								rows={4}
								placeholder="Describe this category..."
								className={`fpt-input ${errors.CategoryDescription ? "is-invalid" : ""}`}
								{...register("CategoryDescription", {
									required: "Description is required",
								})}
							/>
							{errors.CategoryDescription && (
								<Form.Control.Feedback type="invalid">
									{errors.CategoryDescription.message}
								</Form.Control.Feedback>
							)}
						</Form.Group>

						{/* Status */}
						<Form.Group controlId="formIsActive">
							<Form.Label className="fw-bold small text-uppercase text-muted">
								Status
							</Form.Label>
							<Form.Select
								className="fpt-input"
								{...register("isActive")}
							>
								<option value={1}>Active</option>
								<option value={0}>Inactive</option>
							</Form.Select>
						</Form.Group>
					</Stack>
				</Modal.Body>

				<Modal.Footer className="fpt-modal-footer">
					<Button
						variant="light"
						onClick={onModalClose}
						className="px-4 fw-semibold"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						className="fpt-btn-primary px-4 shadow-sm"
					>
						Create Category
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default CreateCategoryModal;
