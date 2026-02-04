import React, { useState } from "react";
import {
	Table,
	Card,
	Badge,
	Button,
	Stack,
	Row,
	Col,
	InputGroup,
	Form,
} from "react-bootstrap";
import {
	People,
	PencilSquare,
	Trash,
	PlusLg,
	Search,
} from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import accountService from "../services/account.service";
import { toast } from "react-toastify";
import { useLoadingStore } from "@/shared/store.js/loading.store";
import UpdateAccountModal from "../components/UpdateAccountModal";
import DeleteAccountModal from "../components/DeleteAccountModal";
import CreateAccountModal from "../components/CreateAccountModal";

// Import các Modal con

const AccountList = () => {
	const loadedAccounts = useLoaderData();
	const [accounts, setAccounts] = useState(
		Array.isArray(loadedAccounts) ? loadedAccounts : [],
	);
	const [searchTerm, setSearchTerm] = useState("");

	// State quản lý Modal
	const [showCreate, setShowCreate] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [selectedAccount, setSelectedAccount] = useState(null);

	// Bộ lọc tìm kiếm tài khoản
	const filteredAccounts = accounts.filter(
		(acc) =>
			acc.AccountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			acc.AccountEmail.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// --- Action Handlers ---

	const handleCreate = async (data) => {
		try {
			useLoadingStore.getState().setGlobalLoading(true);
			const newAcc = await accountService.create(data);
			setAccounts((prev) => [...prev, newAcc]);
			toast.success("Tạo tài khoản thành công!");
		} catch (error) {
			toast.error("Lỗi khi tạo tài khoản!");
		} finally {
			useLoadingStore.getState().setGlobalLoading(false);
		}
	};

	const handleUpdate = async (id, data) => {
		try {
			useLoadingStore.getState().setGlobalLoading(true);
			const updatedAcc = await accountService.update(id, data);
			setAccounts((prev) =>
				prev.map((acc) => (acc.id === id ? updatedAcc : acc)),
			);
			toast.success("Cập nhật thông tin thành công!");
		} catch (error) {
			toast.error("Cập nhật thất bại!");
		} finally {
			useLoadingStore.getState().setGlobalLoading(false);
		}
	};

	const handleDelete = async (id) => {
		try {
			useLoadingStore.getState().setGlobalLoading(true);
			await accountService.delete(id);
			setAccounts((prev) => prev.filter((acc) => acc.id !== id));
			toast.success("Đã xóa tài khoản!");
		} catch (error) {
			toast.error("Xóa thất bại!");
		} finally {
			useLoadingStore.getState().setGlobalLoading(false);
		}
	};

	return (
		<div className="p-4 bg-light min-vh-100">
			<div className="mb-4">
				<h2 className="d-flex align-items-center">
					<People className="me-2 text-fpt-orange" />
					<span className="fw-bold text-fpt-orange">
						User Management
					</span>
				</h2>
			</div>

			<Card className="shadow-sm border-0 overflow-hidden">
				<Card.Header className="bg-white py-3 border-0">
					<Row className="justify-content-between align-items-center g-3">
						<Col md={4}>
							<InputGroup className="search-input-group">
								<InputGroup.Text className="bg-light border-end-0">
									<Search size={14} />
								</InputGroup.Text>
								<Form.Control
									placeholder="Search by name or email..."
									className="border-start-0 bg-light"
									value={searchTerm}
									onChange={(e) =>
										setSearchTerm(e.target.value)
									}
								/>
							</InputGroup>
						</Col>
						<Col className="text-end">
							<Button
								className="fpt-btn-primary px-4"
								onClick={() => setShowCreate(true)}
							>
								<PlusLg className="me-2" /> Add Account
							</Button>
						</Col>
					</Row>
				</Card.Header>

				<Table hover responsive className="mb-0 align-middle">
					<thead className="bg-light text-muted small text-uppercase">
						<tr>
							<th className="ps-4">Name</th>
							<th>Email</th>
							<th>Role</th>
							<th className="text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredAccounts.map((acc) => (
							<tr key={acc.id}>
								<td className="ps-4">
									<div className="fw-bold text-dark">
										{acc.AccountName}
									</div>
								</td>
								<td className="text-muted">
									{acc.AccountEmail}
								</td>
								<td>
									<Badge
										pill
										bg={
											acc.AccountRole === 1
												? "danger"
												: "info"
										}
										className="px-3 py-2"
									>
										{acc.AccountRole === 1
											? "Admin"
											: "Staff"}
									</Badge>
								</td>
								<td className="text-center">
									<Stack
										direction="horizontal"
										gap={3}
										className="justify-content-center"
									>
										<Button
											variant="link"
											className="p-0 text-primary action-btn"
											onClick={() => {
												setSelectedAccount(acc);
												setShowUpdate(true);
											}}
										>
											<PencilSquare size={18} />
										</Button>
										<Button
											variant="link"
											className="p-0 text-danger action-btn"
											onClick={() => {
												setSelectedAccount(acc);
												setShowDelete(true);
											}}
										>
											<Trash size={18} />
										</Button>
									</Stack>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Card>

			{/* Các Modal Điều Khiển */}
			<CreateAccountModal
				show={showCreate}
				handleClose={() => setShowCreate(false)}
				onSubmit={handleCreate}
			/>

			<UpdateAccountModal
				show={showUpdate}
				handleClose={() => setShowUpdate(false)}
				selectedAccount={selectedAccount}
				onSubmit={handleUpdate}
			/>

			<DeleteAccountModal
				show={showDelete}
				handleClose={() => setShowDelete(false)}
				account={selectedAccount}
				onDelete={handleDelete}
			/>
		</div>
	);
};

export default AccountList;
