import React, { useEffect, useState } from "react";
import { Button, Form, FormLabel, Modal, Stack } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import tagsService from "../services/tags.service";
import Select from "react-select";
import { Tags } from "react-bootstrap-icons";
import { useAuthStore } from "@/feature/auth/store/auth.store";
import categoryService from "@/feature/categories/services/category.service";

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

const CreateNewsModal = ({ show, handleClose, onSubmit }) => {
	const user = useAuthStore((state) => state.user);
	const [tagOptions, setTagOptions] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			NewsTitle: "",
			Headline: "",
			NewsContent: "",
			NewsSource: "",
			CategoryID: null,
			NewsStatus: false,
			Tags: [],
		},
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [tagsRes, catsRes] = await Promise.all([
					tagsService.findAll(),
					categoryService.findAll(),
				]);

				setTagOptions(
					tagsRes.map((t) => ({ value: t.id, label: t.TagName })),
				);
				// Chỉ lấy Category đang hoạt động
				setCategoryOptions(
					catsRes
						.filter((c) => c.IsActive === 1 || c.isActive === 1)
						.map((c) => ({ value: c.id, label: c.CategoryName })),
				);
			} catch (error) {
				console.error("Lỗi lấy dữ liệu:", error);
			}
		};
		if (show) fetchData();
	}, [show]);
	const onModalClose = () => {
		reset();
		handleClose();
	};

	const handleFormSubmit = (data) => {
		console.log("🚀 ~ handleFormSubmit ~ data:", data);
		const finalData = {
			...data,
			NewsStatus: data.NewsStatus ? 1 : 0,
			CategoryID: data.CategoryID?.value,
			Tags: data.Tags.map((tag) => tag.value),
			CreatedByID: user?.id,
			UpdatedByID: user?.id,
		};
		onSubmit(finalData);
		onModalClose();
	};

	return (
		<>
			<Modal
				size="lg"
				centered
				dialogClassName="fpt-modal-dialog"
				contentClassName="fpt-modal-content"
				show={show}
				onHide={onModalClose}
			>
				<Form onSubmit={handleSubmit(handleFormSubmit)}>
					<Modal.Header closeButton className="fpt-modal-header">
						<Modal.Title className="fw-bold text-dark">
							Create New News
						</Modal.Title>
					</Modal.Header>
					<Modal.Body className="fpt-modal-body">
						<Stack gap={3}>
							{/* News Title  */}
							<Form.Group controlId="formNewsTitle">
								<FormLabel className="fw-bold small text-uppercase text-muted">
									News Title
								</FormLabel>
								<Form.Control
									type="text"
									placeholder="Enter news title..."
									className={`fpt-input ${errors.NewsTitle ? "is-invalid" : ""}`}
									{...register("NewsTitle", {
										required: "News Title is required",
										minLength: {
											value: 3,
											message: "Minimum 3 characters",
										},
									})}
								/>
								{errors.NewsTitle && (
									<Form.Control.Feedback type="invalid">
										{errors.NewsTitle.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>

							{/* Headline  */}
							<Form.Group controlId="formHeadline">
								<FormLabel className="fw-bold small text-uppercase text-muted">
									Headline
								</FormLabel>
								<Form.Control
									type="text"
									placeholder="Enter headline..."
									className={`fpt-input ${errors.Headline ? "is-invalid" : ""}`}
									{...register("Headline", {
										required: "Headline is required",
										minLength: {
											value: 3,
											message: "Minimum 3 characters",
										},
									})}
								/>
								{errors.Headline && (
									<Form.Control.Feedback type="invalid">
										{errors.Headline.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>

							<Form.Group>
								<FormLabel className="fw-bold small text-uppercase text-muted">
									Category
								</FormLabel>
								<Controller
									name="CategoryID"
									control={control}
									rules={{
										required: "Category is required",
									}}
									render={({ field }) => (
										<Select
											{...field}
											options={categoryOptions}
											placeholder="Select category..."
											styles={customStyles}
											isClearable
										/>
									)}
								/>
								{errors.CategoryID && (
									<span className="text-danger small">
										{errors.CategoryID.message}
									</span>
								)}
							</Form.Group>

							<Form.Group>
								<Form.Label className="fw-bold small text-uppercase text-muted">
									Tags
								</Form.Label>
								<Controller
									name="Tags"
									control={control}
									render={({ field }) => (
										<Select
											{...field}
											isMulti // Cho phép chọn nhiều
											options={tagOptions}
											className="basic-multi-select"
											classNamePrefix="select"
											placeholder="Select tags..."
											styles={customStyles}
											blurInputOnSelect
										/>
									)}
								/>
							</Form.Group>

							{/* News Content  */}
							<Form.Group controlId="formNewsContent">
								<Form.Label className="fw-bold small text-uppercase text-muted">
									News Content
								</Form.Label>
								<Form.Control
									as="textarea"
									rows={4}
									placeholder="Describe news content..."
									className={`fpt-input ${errors.NewsContent ? "is-invalid" : ""}`}
									{...register("NewsContent", {
										required: "News Content is required",
									})}
								/>
								{errors.NewsContent && (
									<Form.Control.Feedback type="invalid">
										{errors.NewsContent.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>
							{/* NewsSource  */}
							<Form.Group controlId="formNewsSource">
								<FormLabel className="fw-bold small text-uppercase text-muted">
									News Source
								</FormLabel>
								<Form.Control
									type="text"
									placeholder="Enter news source..."
									className={`fpt-input ${errors.NewsSource ? "is-invalid" : ""}`}
									{...register("NewsSource", {
										required: "News Source is required",
										minLength: {
											value: 3,
											message: "Minimum 3 characters",
										},
									})}
								/>
								{errors.NewsSource && (
									<Form.Control.Feedback type="invalid">
										{errors.NewsSource.message}
									</Form.Control.Feedback>
								)}
							</Form.Group>

							{/* NewsStatus  */}
							<Form.Group controlId="formNewsStatus">
								<Form.Label className="fw-bold small text-uppercase text-muted">
									News Status
								</Form.Label>
								<Controller
									name="NewsStatus"
									control={control}
									render={({ field }) => (
										<Form.Check
											className="fpt-switch"
											type="switch"
											id="custom-switch"
											checked={field.value}
											onChange={(e) =>
												field.onChange(e.target.checked)
											}
										/>
									)}
								/>
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
							variant="primary"
						>
							Create News
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</>
	);
};

export default CreateNewsModal;
