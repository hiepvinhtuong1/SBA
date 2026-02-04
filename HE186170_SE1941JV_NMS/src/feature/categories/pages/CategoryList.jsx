import React, { useMemo, useState } from "react";
import {
	Table,
	Button,
	Card,
	Row,
	Col,
	Badge,
	Stack,
	Form,
	InputGroup,
	CardHeader,
	CardBody,
} from "react-bootstrap";
import { PlusLg, Search, PencilSquare, Trash } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { toast } from "react-toastify";

// Components
import CreateCategoryModal from "../components/CreateCategoryModal";
import UpdateCategoryModal from "../components/UpdateCategoryModal";
import DeleteCategoryModal from "../components/DeleteCategoryModal";
import categoryService from "../services/category.service";
import "./CategoryList.scss";
const CategoryList = () => {
	const loadedData = useLoaderData();
	const [categories, setCategories] = useState(
		Array.isArray(loadedData) ? loadedData : [],
	);

	// States cho UI
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);

	// States cho Filter
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	// Handlers cho Modals
	const handleShowCreateModal = () => setShowCreateModal(true);
	const handleCloseCreateModal = () => setShowCreateModal(false);

	const handleShowUpdateModal = (cat) => {
		setSelectedCategory(cat);
		setShowUpdateModal(true);
	};

	const handleShowDeleteModal = (cat) => {
		setSelectedCategory(cat);
		setShowDeleteModal(true);
	};

	// Logic CRUD
	const handleCreateSubmit = async (data) => {
		try {
			const newCategory = await categoryService.createCategory(data);
			setCategories((prev) => [...prev, newCategory]);
			handleCloseCreateModal();
			toast.success("Thêm danh mục mới thành công! 🚀");
		} catch (error) {
			toast.error("Thêm thất bại!");
		}
	};

	const handleUpdateSubmit = async (data) => {
		const { id, ...updateData } = data;
		try {
			const updatedCategory = await categoryService.updateCategory(
				updateData,
				id,
			);
			setCategories((prev) =>
				prev.map((cat) =>
					cat.id === updatedCategory.id ? updatedCategory : cat,
				),
			);
			setShowUpdateModal(false);
			toast.success("Cập nhật thành công! ✨");
		} catch (error) {
			toast.error("Cập nhật thất bại!");
		}
	};

	const handleDeleteSubmit = async (id) => {
		try {
			await categoryService.deleteCategory(id);
			setCategories((prev) => prev.filter((cat) => cat.id !== id));
			toast.success("Xóa danh mục thành công!");
		} catch (error) {
			toast.error("Xóa thất bại!");
		}
	};

	// Tối ưu lọc với useMemo
	const filteredCategories = useMemo(() => {
		return categories.filter((cat) => {
			const matchesSearch = cat.CategoryName.toLowerCase().includes(
				searchTerm.toLowerCase(),
			);
			const matchesStatus =
				statusFilter === "all" || cat.IsActive === Number(statusFilter);
			return matchesSearch && matchesStatus;
		});
	}, [categories, searchTerm, statusFilter]);

	return (
		<div className="p-4 bg-light min-vh-100">
			<div className="mb-4">
				<h2 className="d-flex align-items-center">
					<BiCategory className="me-2 text-fpt-orange" />
					<span className="text-fpt-orange fw-bold">
						Categories Management
					</span>
				</h2>
			</div>

			<Card className="shadow-sm border-0 overflow-hidden">
				<CardHeader className="bg-white py-3 border-0">
					<Row className="g-3">
						<Col md={4}>
							<InputGroup className="search-input-group">
								<InputGroup.Text className="bg-transparent border-0">
									<Search size={14} className="text-muted" />
								</InputGroup.Text>
								<Form.Control
									placeholder="Search by name..."
									className=" search-input-form"
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
								/>
							</InputGroup>
						</Col>

						<Col md={2}>
							<Form.Select
								value={statusFilter}
								onChange={(e) =>
									setStatusFilter(e.target.value)
								}
							>
								<option value="all">All Status</option>
								<option value="1">Active</option>
								<option value="0">Inactive</option>
							</Form.Select>
						</Col>

						<Col className="text-end">
							<Button
								className="fpt-btn-primary px-4 d-inline-flex align-items-center gap-2"
								onClick={handleShowCreateModal}
							>
								<PlusLg /> Add Category
							</Button>
						</Col>
					</Row>
				</CardHeader>

				<CardBody className="p-0">
					<Table
						hover
						responsive
						className="mb-0 align-middle fpt-table"
					>
						<thead className="bg-light text-muted small text-uppercase">
							<tr>
								<th className="ps-4" style={{ width: "100px" }}>
									ID
								</th>
								<th>Category Name</th>
								<th>Description</th>
								<th className="text-center">Status</th>
								<th className="text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredCategories.length > 0 ? (
								filteredCategories.map((cat) => (
									<tr key={cat.id}>
										<td className="ps-4 fw-bold text-muted">
											#{cat.id}
										</td>
										<td className="fw-semibold text-dark">
											{cat.CategoryName}
										</td>
										<td
											className="text-muted small"
											style={{ maxWidth: "250px" }}
										>
											{cat.CategoryDescription}
										</td>
										<td className="text-center">
											<Badge
												pill
												bg={
													cat.IsActive === 1
														? "success"
														: "secondary"
												}
												className="px-3 py-2"
											>
												{cat.IsActive === 1
													? "Active"
													: "Inactive"}
											</Badge>
										</td>
										<td className="text-end pe-4">
											<Stack
												direction="horizontal"
												gap={2}
												className="justify-content-center"
											>
												<Button
													variant="link"
													className="p-0 text-primary action-btn"
													onClick={() =>
														handleShowUpdateModal(
															cat,
														)
													}
												>
													<PencilSquare size={18} />
												</Button>
												<Button
													variant="link"
													className="p-0 text-danger action-btn"
													onClick={() =>
														handleShowDeleteModal(
															cat,
														)
													}
												>
													<Trash size={18} />
												</Button>
											</Stack>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan="5"
										className="text-center py-5 text-muted"
									>
										No categories found.
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				</CardBody>
			</Card>

			{/* Modals */}
			<CreateCategoryModal
				show={showCreateModal}
				handleClose={handleCloseCreateModal}
				onSubmit={handleCreateSubmit}
				categories={categories}
			/>
			<UpdateCategoryModal
				show={showUpdateModal}
				handleClose={() => setShowUpdateModal(false)}
				category={selectedCategory}
				categories={categories}
				onSubmit={handleUpdateSubmit}
			/>
			<DeleteCategoryModal
				show={showDeleteModal}
				handleClose={() => setShowDeleteModal(false)}
				category={selectedCategory}
				onDelete={handleDeleteSubmit}
			/>
		</div>
	);
};

export default CategoryList;
