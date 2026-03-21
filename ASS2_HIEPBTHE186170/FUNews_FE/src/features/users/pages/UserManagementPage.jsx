import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Users } from "lucide-react";
import { TableComponent } from "../../../shared/components/TableComponent";
import { ModalComponent } from "../../../shared/components/ModalComponent";
import accountService from "../../../shared/services/accountService";
import { useToast } from "../../../app/provider/ToastProvider";

export const UserManagement = () => {
	const [users, setUsers] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("add");
	const [selectedUser, setSelectedUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({ accountName: "", accountEmail: "", accountPassword: "", role: 2 });
	const { addToast } = useToast();

	const fetchUsers = async () => {
		try {
			setLoading(true);
			const data = await accountService.getAll();
			setUsers(data);
		} catch (error) {
			addToast("Failed to fetch users", "error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { fetchUsers(); }, []);

	const columns = [
		{
			key: "accountName",
			label: "Name",
			render: (val, row) => (
				<div className="flex items-center gap-3">
					<div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-sm font-black">
						{val?.charAt(0)?.toUpperCase()}
					</div>
					<div>
						<div className="font-bold text-on-surface text-sm">{val}</div>
						<div className="text-on-surface-variant text-xs">{row.accountEmail}</div>
					</div>
				</div>
			),
		},
		{
			key: "role",
			label: "Role",
			render: (val) => (
				<span className={`px-3 py-1 rounded-full text-[0.7rem] font-black uppercase tracking-widest ${val === 1 ? "bg-primary/10 text-primary" : "bg-secondary-container text-on-secondary-container"}`}>
					{val === 1 ? "Admin" : "Staff"}
				</span>
			),
		},
		{
			key: "actions",
			label: "Actions",
			render: (_, row) => (
				<div className="flex gap-2">
					<button onClick={() => handleOpenModal("edit", row)} className="p-2 hover:bg-surface-container rounded-lg transition-all text-on-surface-variant hover:text-primary">
						<Edit2 className="w-4 h-4" />
					</button>
					<button onClick={() => handleOpenModal("delete", row)} className="p-2 hover:bg-surface-container rounded-lg transition-all text-on-surface-variant hover:text-error">
						<Trash2 className="w-4 h-4" />
					</button>
				</div>
			),
		},
	];

	const handleOpenModal = (mode, user = null) => {
		setModalMode(mode);
		setSelectedUser(user);
		if (mode === "edit" && user) {
			setFormData({ accountName: user.accountName, accountEmail: user.accountEmail, accountPassword: "", role: user.role });
		} else if (mode === "add") {
			setFormData({ accountName: "", accountEmail: "", accountPassword: "", role: 2 });
		}
		setIsModalOpen(true);
	};

	const handleSubmit = async () => {
		try {
			if (modalMode === "add") {
				await accountService.create(formData);
				addToast("User created successfully", "success");
			} else {
				await accountService.update(selectedUser.accountId, formData);
				addToast("User updated successfully", "success");
			}
			setIsModalOpen(false);
			fetchUsers();
		} catch (error) {
			addToast(error.response?.data?.message || "Operation failed", "error");
		}
	};

	const handleDelete = async () => {
		try {
			await accountService.delete(selectedUser.accountId);
			addToast("User deleted successfully", "success");
			setIsModalOpen(false);
			fetchUsers();
		} catch (error) {
			addToast(error.response?.data?.message || "Delete failed", "error");
		}
	};

	return (
		<div className="p-8 max-w-7xl mx-auto flex flex-col gap-10">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div className="space-y-2">
					<div className="flex items-center gap-3 text-primary mb-2">
						<Users className="w-6 h-6" />
						<span className="text-[0.7rem] font-black uppercase tracking-[0.2em]">Team & Access</span>
					</div>
					<h1 className="text-[2.5rem] font-black tracking-tight text-on-surface leading-none">User Management</h1>
					<p className="text-on-surface-variant font-medium text-lg opacity-80">Manage system accounts and their roles.</p>
				</div>
				<button onClick={() => handleOpenModal("add")} className="bg-primary text-on-primary font-black px-6 py-4 rounded-xl flex items-center gap-3 hover:opacity-90 active:scale-95 transition-all text-sm tracking-widest shadow-lg shadow-primary/20">
					<Plus className="w-5 h-5" />
					CREATE USER
				</button>
			</div>

			<div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex flex-col gap-8">
				{loading ? (
					<div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>
				) : (
					<TableComponent data={users} columns={columns} />
				)}
			</div>

			<ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalMode === "add" ? "Create" : modalMode === "edit" ? "Edit" : "Remove"} User`}>
				{modalMode === "delete" ? (
					<div className="space-y-6 pt-4 text-center">
						<div className="bg-error-container/10 p-4 rounded-2xl">
							<p className="text-on-surface font-semibold text-lg">Are you absolutely sure?</p>
							<p className="text-on-surface-variant text-sm mt-1">This will permanently remove <span className="text-error font-black">{selectedUser?.accountName}</span>.</p>
						</div>
						<div className="flex gap-4">
							<button onClick={() => setIsModalOpen(false)} className="flex-1 bg-surface-container-high py-4 rounded-xl font-black text-xs uppercase tracking-widest">Keep It</button>
							<button onClick={handleDelete} className="flex-1 bg-error text-on-error py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-error/20">Delete Forever</button>
						</div>
					</div>
				) : (
					<form className="space-y-5 pt-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Full Name</label>
							<input type="text" value={formData.accountName} onChange={(e) => setFormData({...formData, accountName: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/20" placeholder="Full name" required />
						</div>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Email</label>
							<input type="email" value={formData.accountEmail} onChange={(e) => setFormData({...formData, accountEmail: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/20" placeholder="email@example.com" required />
						</div>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">{modalMode === "edit" ? "New Password (leave blank to keep)" : "Password"}</label>
							<input type="password" value={formData.accountPassword} onChange={(e) => setFormData({...formData, accountPassword: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/20" placeholder="••••••" {...(modalMode === "add" ? { required: true } : {})} />
						</div>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Role</label>
							<select value={formData.role} onChange={(e) => setFormData({...formData, role: parseInt(e.target.value)})} className="w-full bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/20">
								<option value={1}>Admin</option>
								<option value={2}>Staff</option>
							</select>
						</div>
						<button type="submit" className="w-full bg-primary text-on-primary font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all">
							{modalMode === "add" ? "CREATE USER" : "SAVE CHANGES"}
						</button>
					</form>
				)}
			</ModalComponent>
		</div>
	);
};
