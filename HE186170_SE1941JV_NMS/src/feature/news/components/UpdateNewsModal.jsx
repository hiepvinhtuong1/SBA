import React, { useEffect, useState } from "react";
import { Button, Form, FormLabel, Modal, Stack } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import tagsService from "../services/tags.service";
import categoryService from "@/feature/categories/services/category.service";
import { useAuthStore } from "@/feature/auth/store/auth.store";

// Giữ nguyên customStyles để đồng bộ màu cam FPT
const customStyles = {
	control: (base, state) => ({
		...base,
		borderColor: state.isFocused ? "#f27123" : "#dee2e6",
		boxShadow: state.isFocused ? "0 0 0 1px #f27123" : "none",
		"&:hover": { borderColor: "#f27123" },
	}),
	multiValue: (base) => ({
		...base,
		backgroundColor: "rgba(242, 113, 35, 0.1)",
	}),
	multiValueLabel: (base) => ({ ...base, color: "#f27123" }),
	multiValueRemove: (base) => ({
		...base,
		color: "#f27123",
		"&:hover": { backgroundColor: "#f27123", color: "white" },
	}),
};

const UpdateNewsModal = ({ show, handleClose, onSubmit, selectedNews }) => {
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
		// Thiết lập giá trị mặc định ban đầu để tránh undefined
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
		if (show && selectedNews) {
			reset({
				// Luôn sử dụng toán tử || "" để đảm bảo không bao giờ truyền undefined vào input
				NewsTitle: selectedNews.NewsTitle || "",
				Headline: selectedNews.Headline || "",
				NewsContent: selectedNews.NewsContent || "",
				NewsSource: selectedNews.NewsSource || "",
				CategoryID: selectedNews.CategoryID
					? {
							value: selectedNews.CategoryID,
							label: selectedNews.CategoryName,
						}
					: null,
				NewsStatus: selectedNews.NewsStatus === 1,
				Tags: selectedNews.tags
					? selectedNews.tags.map((tag) => ({
							value: tag.id,
							label: tag.TagName,
						}))
					: [],
			});
		}
	}, [show, selectedNews, reset]);

	// Load options cho Select
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


	const handleFormSubmit = (data) => {
		const finalData = {
			...data,
			NewsStatus: data.NewsStatus ? 1 : 0,
			CategoryID: data.CategoryID?.value,
			Tags: data.Tags.map((tag) => tag.value),
			UpdatedByID: user?.id, // Lưu ID người thực hiện cập nhật
		};
		console.log("🚀 ~ handleFormSubmit ~ finalData:", finalData);
		onSubmit(selectedNews.id, finalData);
		handleClose();
	};

	return (
		<Modal
			size="lg"
			centered
			dialogClassName="fpt-modal-dialog"
			contentClassName="fpt-modal-content"
			show={show}
			onHide={handleClose}
		>
			<Form onSubmit={handleSubmit(handleFormSubmit)}>
				<Modal.Header closeButton className="fpt-modal-header">
					<Modal.Title className="fw-bold text-dark">
						Update{" "}
						<span className="text-fpt-orange ">
							{selectedNews?.NewsTitle}
						</span>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="fpt-modal-body">
					<Stack gap={3}>
						<Form.Group controlId="updNewsTitle">
							<FormLabel className="fw-bold small text-uppercase text-muted">
								News Title
							</FormLabel>
							<Form.Control
								className={`fpt-input ${errors.NewsTitle ? "is-invalid" : ""}`}
								{...register("NewsTitle", {
									required: "Required",
								})}
							/>
						</Form.Group>

						<Form.Group controlId="updHeadline">
							<FormLabel className="fw-bold small text-uppercase text-muted">
								Headline
							</FormLabel>
							<Form.Control
								className={`fpt-input ${errors.Headline ? "is-invalid" : ""}`}
								{...register("Headline", {
									required: "Required",
								})}
							/>
						</Form.Group>

						<Form.Group>
							<FormLabel className="fw-bold small text-uppercase text-muted">
								Category
							</FormLabel>
							<Controller
								name="CategoryID"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										options={categoryOptions}
										styles={customStyles}
										placeholder="Select category..."
									/>
								)}
							/>
						</Form.Group>

						<Form.Group>
							<FormLabel className="fw-bold small text-uppercase text-muted">
								Tags
							</FormLabel>
							<Controller
								name="Tags"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										isMulti
										options={tagOptions}
										styles={customStyles}
										placeholder="Select tags..."
									/>
								)}
							/>
						</Form.Group>

						<Form.Group controlId="updNewsContent">
							<FormLabel className="fw-bold small text-uppercase text-muted">
								News Content
							</FormLabel>
							<Form.Control
								as="textarea"
								rows={4}
								className={`fpt-input ${errors.NewsContent ? "is-invalid" : ""}`}
								{...register("NewsContent", {
									required: "Required",
								})}
							/>
						</Form.Group>

						<Form.Group controlId="updNewsSource">
							<FormLabel className="fw-bold small text-uppercase text-muted">
								News Source
							</FormLabel>
							<Form.Control
								className={`fpt-input ${errors.NewsSource ? "is-invalid" : ""}`}
								{...register("NewsSource", {
									required: "Required",
								})}
							/>
						</Form.Group>

						<Form.Group controlId="updNewsStatus">
							<FormLabel className="fw-bold small text-uppercase text-muted">
								News Status
							</FormLabel>
							<Controller
								name="NewsStatus"
								control={control}
								render={({ field }) => (
									<Form.Check
										type="switch"
										className="fpt-switch"
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
						onClick={handleClose}
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

export default UpdateNewsModal;
