import React from "react";
import {
	Card,
	Form,
	Button,
	Container,
	Row,
	Col,
	Spinner,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/auth.store";

const LoginPage = () => {
	const navigate = useNavigate();

	// Lấy actions và state từ Store
	const { loginAction, isLoading } = useAuthStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		// Gọi action từ store
		const result = await loginAction(data.email, data.password);

		if (result.success) {
			toast.success(`Welcome back, ${result.user.AccountName}!`);
			navigate("/admin");
		} else {
			toast.error(result.message);
		}
	};

	return (
		<Container className="login-container d-flex align-items-center justify-content-center min-vh-100">
			<Card
				className="fpt-card shadow-lg border-0"
				style={{ width: "400px" }}
			>
				<Card.Body className="p-5">
					<h2 className="text-fpt-orange fw-bold text-center mb-4">
						FUNews Login
					</h2>

					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-3">
							<Form.Label className="fw-semibold small text-muted text-uppercase">
								Email
							</Form.Label>
							<Form.Control
								type="email"
								className={`fpt-input ${errors.email ? "is-invalid" : ""}`}
								{...register("email", {
									required: "Email is required",
								})}
							/>
						</Form.Group>

						<Form.Group className="mb-4">
							<Form.Label className="fw-semibold small text-muted text-uppercase">
								Password
							</Form.Label>
							<Form.Control
								type="password"
								className={`fpt-input ${errors.password ? "is-invalid" : ""}`}
								{...register("password", {
									required: "Password is required",
								})}
							/>
						</Form.Group>

						<Button
							type="submit"
							className="fpt-btn-primary w-100 fw-bold py-2"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Spinner
										animation="border"
										size="sm"
										className="me-2"
									/>
									VERIFYING...
								</>
							) : (
								"LOGIN"
							)}
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Container>
	);
};

export default LoginPage;
