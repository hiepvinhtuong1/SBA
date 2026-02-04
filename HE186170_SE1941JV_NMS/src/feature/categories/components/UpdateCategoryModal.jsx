import React, { useEffect } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";

const UpdateCategoryModal = ({
	show,
	handleClose,
	category,
	onSubmit,
	categories,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	// Đồng bộ dữ liệu mỗi khi category thay đổi hoặc modal mở
	useEffect(() => {
		if (category && show) {
			reset({
				CategoryName: category.CategoryName,
				CategoryDescription: category.CategoryDescription,
				ParentCategoryID: category.ParentCategoryID || "",
				isActive: category.IsActive ?? 1,
			});
		}
	}, [category, show, reset]);

	const onModalClose = () => {
		reset();
		handleClose();
	};

	const handleFormSubmit = (data) => {
		// Ép kiểu dữ liệu chuẩn trước khi gửi về cha
		const formattedData = {
			...data,
			id: category.id,
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
			centered
			dialogClassName="fpt-modal-dialog"
			contentClassName="fpt-modal-content"
		>
			<Form onSubmit={handleSubmit(handleFormSubmit)}>
				<Modal.Header closeButton className="fpt-modal-header">
					<Modal.Title className="fw-bold text-dark">
						Update Category:{" "}
						<span className="text-fpt-orange">
							{category?.CategoryName}
						</span>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body className="fpt-modal-body py-4">
					<Stack gap={3}>
						{/* Category Name */}
						<Form.Group controlId="formUpdateCategoryName">
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
						<Form.Group controlId="formUpdateParentCategory">
							<Form.Label className="fw-bold small text-uppercase text-muted">
								Parent Category
							</Form.Label>
							<Form.Select
								className="fpt-input"
								{...register("ParentCategoryID")}
							>
								<option value="">
									None (Primary Category)
								</option>
								{categories
									.filter((cat) => cat.id !== category?.id) // Không cho chọn chính nó làm cha
									.map((cat) => (
										<option key={cat.id} value={cat.id}>
											{cat.CategoryName}
										</option>
									))}
							</Form.Select>
						</Form.Group>

						{/* Description */}
						<Form.Group controlId="formUpdateCategoryDescription">
							<Form.Label className="fw-bold small text-uppercase text-muted">
								Description
							</Form.Label>
							<Form.Control
								as="textarea"
								rows={4}
								placeholder="Enter category details..."
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
						<Form.Group controlId="formUpdateIsActive">
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
						Save Changes
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default UpdateCategoryModal;
