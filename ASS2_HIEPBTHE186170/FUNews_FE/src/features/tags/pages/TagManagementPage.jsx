import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Tag } from "lucide-react";
import { TableComponent } from "../../../shared/components/TableComponent";
import { ModalComponent } from "../../../shared/components/ModalComponent";
import tagService from "../../../shared/services/tagService";
import { useToast } from "../../../app/provider/ToastProvider";

export const TagManagement = () => {
	const [tags, setTags] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("add");
	const [selectedTag, setSelectedTag] = useState(null);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({ tagName: "", tagNote: "" });
	const { addToast } = useToast();

	const fetchTags = async () => {
		try {
			setLoading(true);
			const data = await tagService.getAll();
			setTags(data);
		} catch (error) {
			addToast("Failed to fetch tags", "error");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => { fetchTags(); }, []);

	const columns = [
		{ key: "tagName", label: "Tag Name" },
		{ key: "tagNote", label: "Note" },
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

	const handleOpenModal = (mode, tag = null) => {
		setModalMode(mode);
		setSelectedTag(tag);
		if (mode === "edit" && tag) {
			setFormData({ tagName: tag.tagName, tagNote: tag.tagNote || "" });
		} else if (mode === "add") {
			setFormData({ tagName: "", tagNote: "" });
		}
		setIsModalOpen(true);
	};

	const handleSubmit = async () => {
		try {
			if (modalMode === "add") {
				await tagService.create(formData);
				addToast("Tag created successfully", "success");
			} else if (modalMode === "edit") {
				await tagService.update(selectedTag.tagId, formData);
				addToast("Tag updated successfully", "success");
			}
			setIsModalOpen(false);
			fetchTags();
		} catch (error) {
			addToast(error.response?.data?.message || "Operation failed", "error");
		}
	};

	const handleDelete = async () => {
		try {
			await tagService.delete(selectedTag.tagId);
			addToast("Tag deleted successfully", "success");
			setIsModalOpen(false);
			fetchTags();
		} catch (error) {
			addToast(error.response?.data?.message || "Delete failed", "error");
		}
	};

	return (
		<div className="p-8 max-w-7xl mx-auto flex flex-col gap-10">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div className="space-y-2">
					<div className="flex items-center gap-3 text-primary mb-2">
						<Tag className="w-6 h-6" />
						<span className="text-[0.7rem] font-black uppercase tracking-[0.2em]">Content Taxonomy</span>
					</div>
					<h1 className="text-[2.5rem] font-black tracking-tight text-on-surface leading-none">Tag Management</h1>
					<p className="text-on-surface-variant font-medium text-lg opacity-80">Manage tags for news article classification.</p>
				</div>
				<button onClick={() => handleOpenModal("add")} className="bg-primary text-on-primary font-black px-6 py-4 rounded-xl flex items-center gap-3 hover:opacity-90 active:scale-95 transition-all text-sm tracking-widest shadow-lg shadow-primary/20">
					<Plus className="w-5 h-5" />
					CREATE TAG
				</button>
			</div>

			<div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex flex-col gap-8">
				{loading ? (
					<div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>
				) : (
					<TableComponent data={tags} columns={columns} />
				)}
			</div>

			<ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalMode === "add" ? "Create New" : modalMode === "edit" ? "Edit" : "Remove"} Tag`}>
				{modalMode === "delete" ? (
					<div className="space-y-6 pt-4 text-center">
						<div className="bg-error-container/10 p-4 rounded-2xl">
							<p className="text-on-surface font-semibold text-lg">Are you absolutely sure?</p>
							<p className="text-on-surface-variant text-sm mt-1">This will permanently remove tag <span className="text-error font-black">{selectedTag?.tagName}</span>.</p>
						</div>
						<div className="flex gap-4">
							<button onClick={() => setIsModalOpen(false)} className="flex-1 bg-surface-container-high py-4 rounded-xl font-black text-xs uppercase tracking-widest">Keep It</button>
							<button onClick={handleDelete} className="flex-1 bg-error text-on-error py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-error/20">Delete Forever</button>
						</div>
					</div>
				) : (
					<form className="space-y-6 pt-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Tag Name</label>
							<input type="text" value={formData.tagName} onChange={(e) => setFormData({...formData, tagName: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-4 text-sm font-semibold focus:ring-2 focus:ring-primary/20" placeholder="e.g., AI, Innovation" required />
						</div>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Note</label>
							<textarea value={formData.tagNote} onChange={(e) => setFormData({...formData, tagNote: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-4 text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none" placeholder="Tag description..." />
						</div>
						<button type="submit" className="w-full bg-primary text-on-primary font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all">
							{modalMode === "add" ? "CREATE TAG" : "SAVE CHANGES"}
						</button>
					</form>
				)}
			</ModalComponent>
		</div>
	);
};
