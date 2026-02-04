import React from "react";
import { Button, Form, Modal, Stack, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CreateAccountModal = ({ show, handleClose, onSubmit }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const handleFormSubmit = (data) => {
		onSubmit({ ...data, AccountRole: Number(data.AccountRole) });
		reset();
		handleClose();
	};

	return (
		<Modal show={show} onHide={handleClose} centered>
			<Form onSubmit={handleSubmit(handleFormSubmit)}>
				<Modal.Header closeButton className="fpt-modal-header">
					<Modal.Title className="fw-bold">
						Create New Account
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Stack gap={3}>
						<Form.Group>
							<Form.Label className="fw-bold small text-muted">
								FULL NAME
							</Form.Label>
							<Form.Control
								{...register("AccountName", { required: true })}
								className="fpt-input"
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label className="fw-bold small text-muted">
								EMAIL
							</Form.Label>
							<Form.Control
								type="email"
								{...register("AccountEmail", {
									required: true,
								})}
								className="fpt-input"
							/>
						</Form.Group>
						<Row>
							<Col md={6}>
								<Form.Group>
									<Form.Label className="fw-bold small text-muted">
										ROLE
									</Form.Label>
									<Form.Select {...register("AccountRole")}>
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
										type="password"
										{...register("AccountPassword", {
											required: true,
										})}
										className="fpt-input"
									/>
								</Form.Group>
							</Col>
						</Row>
					</Stack>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="light" onClick={handleClose}>
						Cancel
					</Button>
					<Button type="submit" className="fpt-btn-primary">
						Create Account
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	);
};

export default CreateAccountModal;
