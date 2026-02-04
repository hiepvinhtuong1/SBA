import React, { useState, useMemo } from "react";
import {
	Table,
	Card,
	Row,
	Col,
	Badge,
	Stack,
	Form,
	InputGroup,
	CardHeader,
	CardBody,
	Button,
} from "react-bootstrap";
import {
	Eye,
	Newspaper,
	PencilSquare,
	PlusLg,
	Search,
	Tag,
	Trash,
} from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import "./NewList.scss";
import CreateNewsModal from "../components/CreateNewsModal";
import newsService from "../services/news.service";
import { toast } from "react-toastify";
import { useLoadingStore } from "@/shared/store.js/loading.store";
import UpdateNewsModal from "../components/UpdateNewsModal";
import ReadNewsModal from "../components/ReadNewsModal";
import DeleteNewsModal from "../components/DeleteNewsModal";
const NewsList = () => {
	const loadedData = useLoaderData();
	const [news, setNews] = useState(
		Array.isArray(loadedData) ? loadedData : [],
	);

	// Filter States
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	// Logic Lọc Dữ Liệu mượt mà với useMemo
	const filteredNews = useMemo(() => {
		return news.filter((item) => {
			const matchesSearch =
				item.NewsTitle.toLowerCase().includes(
					searchTerm.toLowerCase(),
				) ||
				item.Headline.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus =
				statusFilter === "all" ||
				item.NewsStatus === Number(statusFilter);
			return matchesSearch && matchesStatus;
		});
	}, [news, searchTerm, statusFilter]);

	const [showReadModal, setShowReadModal] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedNews, setSelectedNews] = useState(null);

	const handleShowReadModal = (article) => {
		setSelectedNews(article);
		setShowReadModal(true);
	};
	const handleCLoseReadModal = () => setShowReadModal(false);

	const handleShowCreateModal = () => setShowCreateModal(true);
	const handleCloseCreateModal = () => setShowCreateModal(false);
	const handleCreateSubmit = async (data) => {
		try {
			useLoadingStore.getState().setGlobalLoading(true);
			const newNews = await newsService.createNews(data);
			setNews((prev) => [...prev, newNews]);
			handleCloseCreateModal();
			toast.success("Thêm tin tức mới thành công! 🚀");
		} catch (error) {
			toast.error("Thêm thất bại!");
		} finally {
			useLoadingStore.getState().setGlobalLoading(false);
		}
	};

	const handleShowUpdateModal = (article) => {
		setSelectedNews(article);
		setShowUpdateModal(true);
	};
	const handleCloseUpdateModal = () => setShowUpdateModal(false);
	const handleUpdateSubmit = async (id, data) => {
		try {
			useLoadingStore.getState().setGlobalLoading(true);
			const updatedArticle = await newsService.updateNews(id, data);

			setNews((prev) =>
				prev.map((article) =>
					article.id === id ? updatedArticle : article,
				),
			);

			toast.success("Cập nhật tin tức thành công! 🚀");
		} catch (error) {
			toast.error("Cập nhật thất bại!");
		} finally {
			useLoadingStore.getState().setGlobalLoading(false);
			handleCloseUpdateModal();
		}
	};

	const handleDeleteSubmit = async (id) => {
		try {
			useLoadingStore.getState().setGlobalLoading(true); // Bật loading

			await newsService.deleteNews(id); // Gọi service xóa bài viết và tags liên quan

			// Cập nhật lại state danh sách tin tức tại chỗ
			setNews((prev) => prev.filter((item) => item.id !== id));

			toast.success("Article deleted successfully! 🗑️");
		} catch (error) {
			console.error("Delete error:", error);
			toast.error("Failed to delete article!");
		} finally {
			useLoadingStore.getState().setGlobalLoading(false); // Tắt loading
			setShowDeleteModal(false);
		}
	};

	return (
		<div className="p-4 bg-light min-vh-100">
			<div className="mb-4">
				<h2 className="d-flex align-items-center">
					<Newspaper className="me-2 " />
					<span className="text-fpt-orange fw-bold">
						News Management
					</span>
				</h2>
			</div>

			<Card className="shadow-sm border-0 overflow-hidden fpt-card">
				<CardHeader className="bg-white py-3 border-0">
					<Row className="g-3">
						<Col md={4}>
							<InputGroup className="search-input-group">
								<InputGroup.Text className="bg-transparent border-0">
									<Search size={14} className="text-muted" />
								</InputGroup.Text>
								<Form.Control
									id="newsSearch"
									name="newsSearch"
									placeholder="Search news by title or headline..."
									className="border-start-0 search-input-form"
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
								<option value="1">Published</option>
								<option value="0">Draft</option>
							</Form.Select>
						</Col>

						<Col className="text-end">
							<Button
								className="fpt-btn-primary px-4 d-inline-flex align-items-center gap-2"
								onClick={handleShowCreateModal}
							>
								<PlusLg /> Add News
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
								<th className="ps-4" style={{ width: "80px" }}>
									ID
								</th>
								<th>Content Details</th>
								<th>Category</th>
								<th>Tags</th>
								<th className="text-center">Status</th>
								<th className="text-center">Modified</th>
								<th className="text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredNews.length > 0 ? (
								filteredNews.map((article) => (
									<tr key={article.id}>
										<td className="ps-4 fw-bold text-muted">
											#{article.id}
										</td>
										<td>
											<div className="fw-semibold text-dark mb-1">
												{article.NewsTitle}
											</div>
											<div
												className="text-muted small text-truncate"
												style={{ maxWidth: "350px" }}
											>
												{article.Headline}
											</div>
										</td>
										<td>
											<Badge
												bg="light"
												className="text-dark border fw-normal"
											>
												{article.CategoryName ||
													`Category ${article.CategoryID}`}
											</Badge>
										</td>
										<td>
											<div className="d-flex flex-wrap gap-1">
												{article.tags &&
												article.tags.length > 0 ? (
													article.tags.map((tag) => (
														<Badge
															bg="none"
															key={tag.id}
															pill
															className="fpt-badge-tag"
														>
															<Tag
																size={10}
																className="me-1"
															/>
															{tag.TagName}
														</Badge>
													))
												) : (
													<span className="text-muted small italic">
														No tags
													</span>
												)}
											</div>
										</td>
										<td className="text-center">
											<Badge
												pill
												bg={
													article.NewsStatus === 1
														? "success"
														: "secondary"
												}
												className="px-3 py-2"
											>
												{article.NewsStatus === 1
													? "Published"
													: "Draft"}
											</Badge>
										</td>
										<td className="text-center">
											<div className="fw-semibold small">
												{article.EditorName}
											</div>{" "}
											{/* Hiện tên người sửa */}
											<div
												className="text-muted"
												style={{ fontSize: "11px" }}
											>
												{article.ModifiedDate}
											</div>{" "}
											{/* Hiện ngày sửa */}
										</td>
										<td className="text-center">
											<Stack
												direction="horizontal"
												gap={2}
												className="justify-content-center"
											>
												<Button
													variant="link"
													className="p-0 text-primary action-btn"
													onClick={() =>
														handleShowReadModal(
															article,
														)
													}
												>
													<Eye
														size={18}
														className="text-info"
													/>
												</Button>
												<Button
													variant="link"
													className="p-0 text-primary action-btn"
													onClick={() =>
														handleShowUpdateModal(
															article,
														)
													}
												>
													<PencilSquare size={18} />
												</Button>
												<Button
													variant="link"
													className="p-0 text-danger action-btn"
													onClick={() => {
														setSelectedNews(
															article,
														);
														setShowDeleteModal(
															true,
														);
													}}
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
										colSpan="6"
										className="text-center py-5 text-muted"
									>
										No news articles found matching your
										filters.
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				</CardBody>
			</Card>

			<ReadNewsModal
				show={showReadModal}
				handleClose={handleCLoseReadModal}
				selectedNews={selectedNews}
			/>
			<CreateNewsModal
				show={showCreateModal}
				handleClose={handleCloseCreateModal}
				onSubmit={handleCreateSubmit}
			/>
			<UpdateNewsModal
				show={showUpdateModal}
				handleClose={handleCloseUpdateModal}
				selectedNews={selectedNews}
				onSubmit={handleUpdateSubmit}
			/>
			<DeleteNewsModal
				show={showDeleteModal}
				handleClose={() => setShowDeleteModal(false)}
				newsItem={selectedNews}
				onDelete={handleDeleteSubmit}
			/>
		</div>
	);
};

export default NewsList;
