import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, Newspaper } from "lucide-react";
import { TableComponent } from "../../../shared/components/TableComponent";
import { ModalComponent } from "../../../shared/components/ModalComponent";
import newsService from "../../../shared/services/newsService";
import categoryService from "../../../shared/services/categoryService";
import tagService from "../../../shared/services/tagService";
import { useToast } from "../../../app/provider/ToastProvider";

export const NewsManagement = () => {
	const [news, setNews] = useState([]);
	const [categories, setCategories] = useState([]);
	const [allTags, setAllTags] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState("add");
	const [selectedNews, setSelectedNews] = useState(null);
	const [loading, setLoading] = useState(true);
	const [searchKeyword, setSearchKeyword] = useState("");
	const { addToast } = useToast();
	const [formData, setFormData] = useState({
		newsTitle: "", newsContent: "", newsSource: "", newsStatus: 1, categoryId: "", tagIds: []
	});

	const fetchNews = async () => {
		try {
			setLoading(true);
			const data = await newsService.getAll();
			setNews(data);
		} catch (error) {
			addToast("Failed to fetch news", "error");
		} finally {
			setLoading(false);
		}
	};

	const fetchMeta = async () => {
		try {
			const [cats, tags] = await Promise.all([categoryService.getAll(), tagService.getAll()]);
			setCategories(cats);
			setAllTags(tags);
		} catch (error) {
			addToast("Failed to fetch metadata", "error");
		}
	};

	useEffect(() => { fetchNews(); fetchMeta(); }, []);

	const columns = [
		{ key: "newsTitle", label: "Title" },
		{ key: "categoryName", label: "Category" },
		{
			key: "tags",
			label: "Tags",
			render: (tags) => (
				<div className="flex flex-wrap gap-1">
					{tags?.map(t => (
						<span key={t.tagId} className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[0.65rem] font-bold">{t.tagName}</span>
					))}
				</div>
			),
		},
		{ key: "createdByName", label: "Author" },
		{
			key: "newsStatus",
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

	const handleOpenModal = (mode, article = null) => {
		setModalMode(mode);
		setSelectedNews(article);
		if (mode === "edit" && article) {
			setFormData({
				newsTitle: article.newsTitle, newsContent: article.newsContent, newsSource: article.newsSource || "",
				newsStatus: article.newsStatus, categoryId: article.categoryId,
				tagIds: article.tags?.map(t => t.tagId) || []
			});
		} else if (mode === "add") {
			setFormData({ newsTitle: "", newsContent: "", newsSource: "", newsStatus: 1, categoryId: "", tagIds: [] });
		}
		setIsModalOpen(true);
	};

	const handleSubmit = async () => {
		try {
			const payload = { ...formData, categoryId: Number(formData.categoryId) };
			if (modalMode === "add") {
				await newsService.create(payload);
				addToast("Article published successfully", "success");
			} else {
				await newsService.update(selectedNews.newsArticleId, payload);
				addToast("Article updated successfully", "success");
			}
			setIsModalOpen(false);
			fetchNews();
		} catch (error) {
			addToast(error.response?.data?.message || "Operation failed", "error");
		}
	};

	const handleDelete = async () => {
		try {
			await newsService.delete(selectedNews.newsArticleId);
			addToast("Article deleted successfully", "success");
			setIsModalOpen(false);
			fetchNews();
		} catch (error) {
			addToast(error.response?.data?.message || "Delete failed", "error");
		}
	};

	const handleSearch = async (e) => {
		const keyword = e.target.value;
		setSearchKeyword(keyword);
		if (keyword.trim()) {
			try { const data = await newsService.search(keyword); setNews(data); } catch { fetchNews(); }
		} else {
			fetchNews();
		}
	};

	const toggleTag = (tagId) => {
		setFormData(prev => ({
			...prev,
			tagIds: prev.tagIds.includes(tagId)
				? prev.tagIds.filter(id => id !== tagId)
				: [...prev.tagIds, tagId]
		}));
	};

	return (
		<div className="p-8 max-w-7xl mx-auto flex flex-col gap-10">
			<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
				<div className="space-y-2">
					<div className="flex items-center gap-3 text-primary mb-2">
						<Newspaper className="w-6 h-6" />
						<span className="text-[0.7rem] font-black uppercase tracking-[0.2em]">Editorial Suite</span>
					</div>
					<h1 className="text-[2.5rem] font-black tracking-tight text-on-surface leading-none">News Management</h1>
					<p className="text-on-surface-variant font-medium text-lg opacity-80">Manage, edit, and publish news articles.</p>
				</div>
				<button onClick={() => handleOpenModal("add")} className="bg-primary text-on-primary font-black px-6 py-4 rounded-xl flex items-center gap-3 hover:opacity-90 active:scale-95 transition-all text-sm tracking-widest shadow-lg shadow-primary/20">
					<Plus className="w-5 h-5" />
					CREATE ARTICLE
				</button>
			</div>

			<div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/10 shadow-sm flex flex-col gap-8">
				<div className="relative w-full md:w-96 group">
					<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline group-focus-within:text-primary transition-colors" />
					<input type="text" placeholder="Search articles..." value={searchKeyword} onChange={handleSearch} className="w-full bg-surface-container-high border-none rounded-xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline font-medium" />
				</div>

				{loading ? (
					<div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>
				) : (
					<TableComponent data={news} columns={columns} />
				)}
			</div>

			<ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`${modalMode === "add" ? "Create" : modalMode === "edit" ? "Edit" : "Remove"} Article`} size="lg">
				{modalMode === "delete" ? (
					<div className="space-y-6 pt-4 text-center">
						<div className="bg-error-container/10 p-4 rounded-2xl">
							<p className="text-on-surface font-semibold text-lg">Are you absolutely sure?</p>
							<p className="text-on-surface-variant text-sm mt-1">This will permanently remove <span className="text-error font-black">{selectedNews?.newsTitle}</span>.</p>
						</div>
						<div className="flex gap-4">
							<button onClick={() => setIsModalOpen(false)} className="flex-1 bg-surface-container-high py-4 rounded-xl font-black text-xs uppercase tracking-widest">Keep It</button>
							<button onClick={handleDelete} className="flex-1 bg-error text-on-error py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-error/20">Delete Forever</button>
						</div>
					</div>
				) : (
					<form className="space-y-5 pt-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Title</label>
							<input type="text" value={formData.newsTitle} onChange={(e) => setFormData({...formData, newsTitle: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/20" placeholder="Article title" required />
						</div>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Content</label>
							<textarea value={formData.newsContent} onChange={(e) => setFormData({...formData, newsContent: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/20 min-h-[160px] resize-none" placeholder="Write your article..." required />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Category</label>
								<select value={formData.categoryId} onChange={(e) => setFormData({...formData, categoryId: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/20" required>
									<option value="">Select category</option>
									{categories.map(c => (<option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>))}
								</select>
							</div>
							<div className="space-y-2">
								<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Status</label>
								<select value={formData.newsStatus} onChange={(e) => setFormData({...formData, newsStatus: parseInt(e.target.value)})} className="w-full bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/20">
									<option value={1}>Active</option>
									<option value={0}>Inactive</option>
								</select>
							</div>
						</div>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Source</label>
							<input type="text" value={formData.newsSource} onChange={(e) => setFormData({...formData, newsSource: e.target.value})} className="w-full bg-surface-container border-none rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-primary/20" placeholder="e.g., Reuters" />
						</div>
						<div className="space-y-2">
							<label className="text-[0.65rem] font-black uppercase tracking-widest text-on-surface-variant ml-1">Tags</label>
							<div className="flex flex-wrap gap-2">
								{allTags.map(tag => (
									<button key={tag.tagId} type="button" onClick={() => toggleTag(tag.tagId)}
										className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${formData.tagIds.includes(tag.tagId) ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}`}>
										{tag.tagName}
									</button>
								))}
							</div>
						</div>
						<button type="submit" className="w-full bg-primary text-on-primary font-black py-4 rounded-xl text-xs uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all">
							{modalMode === "add" ? "PUBLISH ARTICLE" : "SAVE CHANGES"}
						</button>
					</form>
				)}
			</ModalComponent>
		</div>
	);
};
