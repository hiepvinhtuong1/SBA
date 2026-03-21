import { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit2, Trash2, Layout } from "lucide-react";
import { TableComponent } from "../../../shared/components/TableComponent";
import { ModalComponent } from "../../../shared/components/ModalComponent";
import categoryService from "../../../shared/services/categoryService";
import { useToast } from "../../../app/provider/ToastProvider";

export const CategoryManagement = () => {
	const [categories, setCategories] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("add");
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({ categoryName: "", categoryDescription: "", categoryStatus: 1 });
	const [searchKeyword, setSearchKeyword] = useState("");
	const { addToast } = useToast();

	const fetchCategories = async () => {
		try {
			setLoading(true);
			const data = await categoryService.getAll();
			setCategories(data);
		} catch (error) {
			addToast("Failed to fetch categories", "error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { fetchCategories(); }, []);

	const columns = [
		{ key: "categoryName", label: "Category Name" },
		{ key: "categoryDescription", label: "Description" },
		{ key: "newsCount", label: "Articles" },
		{
			key: "categoryStatus",
			label: "Status",
			render: (val) => (
				<span className={`px-3 py-1 rounded-full text-[0.7rem] font-black uppercase tracking-widest ${val === 1 ? "bg-primary/10 text-primary" : "bg-outline-variant/10 text-on-surface-variant"}`}>
					{val === 1 ? "Active" : "Inactive"}
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

	const handleOpenModal = (mode, category = null) => {
		setModalMode(mode);
		setSelectedCategory(category);
		if (mode === "edit" && category) {
			setFormData({ categoryName: category.categoryName, categoryDescription: category.categoryDescription, categoryStatus: category.categoryStatus });
		} else if (mode === "add") {
			setFormData({ categoryName: "", categoryDescription: "", categoryStatus: 1 });
		}
		setIsModalOpen(true);
	};

	const handleSubmit = async () => {
		try {
			if (modalMode === "add") {
				await categoryService.create(formData);
				addToast("Category created successfully", "success");
			} else if (modalMode === "edit") {
				await categoryService.update(selectedCategory.categoryId, formData);
				addToast("Category updated successfully", "success");
			}
			setIsModalOpen(false);
			fetchCategories();
		} catch (error) {
			addToast(error.response?.data?.message || "Operation failed", "error");
		}
	};

	const handleDelete = async () => {
		try {
			await categoryService.delete(selectedCategory.categoryId);
			addToast("Category deleted successfully", "success");
			setIsModalOpen(false);
			fetchCategories();
		} catch (error) {
			addToast(error.response?.data?.message || "Delete failed", "error");
		}
	};

	const handleSearch = async (e) => {
		const keyword = e.target.value;
		setSearchKeyword(keyword);
		if (keyword.trim()) {
			try {
				const data = await categoryService.search(keyword);
				setCategories(data);
			} catch { fetchCategories(); }
		} else {
			fetchCategories();
		}
	};

	return (
		<div className="p-8 max-w-7xl mx-auto flex flex-col gap-10">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div className="space-y-2">
					<div className="flex items-center gap-3 text-primary mb-2">
						<Layout className="w-6 h-6" />
						<span className="text-[0.7rem] font-black uppercase tracking-[0.2em]">Newsroom Assets</span>
					</div>
					<h1 className="text-[2.5rem] font-black tracking-tight text-on-surface leading-none">Category Management</h1>
					<p className="text-on-surface-variant font-medium text-lg opacity-80">Organize and classify your editorial content taxonomy.</p>
				</div>
				<button onClick={() => handleOpenModal("add")} className="bg-primary text-on-primary font-black px-6 py-4 rounded-xl flex items-center gap-3 hover:opacity-90 active:scale-95 transition-all text-sm tracking-widest shadow-lg shadow-primary/20">
					<Plus className="w-5 h-5" />
					CREATE CATEGORY
				</button>
			</div>

			<div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex flex-col gap-8">
				<div className="flex flex-col md:flex-row gap-4 justify-between items-center">
					<div className="relative w-full md:w-96 group">
						<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
						<input type="text" placeholder="Search categories..." value={searchKeyword} onChange={handleSearch} className="w-full bg-surface-container-high border-none rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline font-medium" />
					</div>
				</div>

				{loading ? (
					<div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>
				) : (
					<TableComponent data={categories} columns={columns} />
				)}
			</div>

			<ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalMode === "add" ? "Create New" : modalMode === "edit" ? "Edit" : "Remove"} Category`}>
				{modalMode === "delete" ? (
					<div className="space-y-6 pt-4 text-center">
						<div className="bg-error-container/10 p-4 rounded-2xl">
							<p className="text-on-surface font-semibold text-lg">Are you absolutely sure?</p>
							<p className="text-on-surface-variant text-sm mt-1">This will permanently remove <span className="text-error font-black">{selectedCategory?.categoryName}</span>.</p>
						</div>
						<div className="flex gap-4">
							<button onClick={() => setIsModalOpen(false)} className="flex-1 bg-surface-container-high py-4 rounded-xl font-black text-xs uppercase tracking-widest">Keep It</button>
							<button onClick={handleDelete} className="flex-1 bg-error text-on-error py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-error/20">Delete Forever</button>
						</div>
					</div>
				) : (
					<form className="space-y-6 pt-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Category Label</label>
							<input type="text" value={formData.categoryName} onChange={(e) => setFormData({...formData, categoryName: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-4 text-sm font-semibold focus:ring-2 focus:ring-primary/20" placeholder="e.g., Technology" required />
						</div>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Description</label>
							<textarea value={formData.categoryDescription} onChange={(e) => setFormData({...formData, categoryDescription: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-4 text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-h-[120px] resize-none" placeholder="Brief description..." />
						</div>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Status</label>
							<select value={formData.categoryStatus} onChange={(e) => setFormData({...formData, categoryStatus: parseInt(e.target.value)})} className="w-full bg-surface-container border-none rounded-xl px-4 py-4 text-sm font-semibold focus:ring-2 focus:ring-primary/20">
								<option value={1}>Active</option>
								<option value={0}>Inactive</option>
							</select>
						</div>
						<button type="submit" className="w-full bg-primary text-on-primary font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all">
							{modalMode === "add" ? "CREATE CATEGORY" : "SAVE CHANGES"}
						</button>
					</form>
				)}
			</ModalComponent>
		</div>
	);
};
