import React, { useEffect } from "react";
import { Button, Form, Modal, Stack, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

const UpdateAccountModal = ({
	show,
	handleClose,
	onSubmit,
	selectedAccount,
}) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	// Đổ dữ liệu cũ vào Form khi Modal mở
	useEffect(() => {
		if (show && selectedAccount) {
			reset({
				AccountName: selectedAccount.AccountName || "",
				AccountEmail: selectedAccount.AccountEmail || "",
				AccountRole: selectedAccount.AccountRole,
				AccountPassword: selectedAccount.AccountPassword || "",
			});
		}
	}, [show, selectedAccount, reset]);

	const handleFormSubmit = (data) => {
		// Chuyển đổi Role sang kiểu Number trước khi gửi lên API
		onSubmit(selectedAccount.id, {
			...data,
			AccountRole: Number(data.AccountRole),
		});
		handleClose();
	};

	return (
		<Modal
			show={show}
			onHide={handleClose}
			centered
			contentClassName="fpt-modal-content"
		>
			<Form onSubmit={handleSubmit(handleFormSubmit)}>
				<Modal.Header closeButton className="fpt-modal-header">
					<Modal.Title className="fw-bold text-dark">
						Update Account:{" "}
						<span className="text-fpt-orange">
							#{selectedAccount?.id}
						</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="fpt-modal-body">
					<Stack gap={3}>
						<Form.Group>
							<Form.Label className="fw-bold small text-muted">
								FULL NAME
							</Form.Label>
							<Form.Control
								{...register("AccountName", {
									required: "Full name is required",
								})}
								className={`fpt-input ${errors.AccountName ? "is-invalid" : ""}`}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="fw-bold small text-muted">
								EMAIL
							</Form.Label>
							<Form.Control
								type="email"
								{...register("AccountEmail", {
									required: "Email is required",
								})}
								className={`fpt-input ${errors.AccountEmail ? "is-invalid" : ""}`}
							/>
						</Form.Group>
						<Row>
							<Col md={6}>
								<Form.Group>
									<Form.Label className="fw-bold small text-muted">
										ROLE
									</Form.Label>
									<Form.Select
										{...register("AccountRole")}
										className="fpt-input"
									>
										<option value={1}>Admin</option>
										<option value={2}>Staff</option>
									</Form.Select>
								</Form.Group>
							</Col>
							<Col md={6}>
								<Form.Group>
									<Form.Label className="fw-bold small text-muted">
										PASSWORD
									</Form.Label>
									<Form.Control
										type="text" // Để text cho dễ sửa nếu Admin quên pass
										{...register("AccountPassword", {
											required: "Password is required",
										})}
										className={`fpt-input ${errors.AccountPassword ? "is-invalid" : ""}`}
									/>
								</Form.Group>
							</Col>
						</Row>
					</Stack>
				</Modal.Body>
				<Modal.Footer className="fpt-modal-footer">
					<Button
						variant="light"
						onClick={handleClose}
						className="px-4"
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

export default UpdateAccountModal;
