import axiosClient from "@/shared/services/axiosClient";

const newsService = {
    // 1. Lấy danh sách News kèm đầy đủ thông tin Category, Author và Tags
    findAll: async () => {
        try {
            // 1. Lấy dữ liệu từ tất cả các bảng cùng một lúc
            const [newsRes, catsRes, accountsRes, newsTagsRes, tagsRes] = await Promise.all([
                axiosClient.get("/newsArticles"),
                axiosClient.get("/categories"),
                axiosClient.get("/systemAccounts"),
                axiosClient.get("/newsTags"),
                axiosClient.get("/tags")
            ]);

            const news = newsRes.data;
            const categories = catsRes.data;
            const accounts = accountsRes.data;
            const newsTags = newsTagsRes.data;
            const tags = tagsRes.data;

            // 2. Map dữ liệu để lắp ghép các giá trị
            return news.map(article => {
                // Tìm object Category dựa trên CategoryID trong bài viết
                const category = categories.find(c => c.id === article.CategoryID);

                // Tìm thông tin Tác giả
                const author = accounts.find(a => a.id === article.CreatedByID);
                const editor = accounts.find(a => a.id === article.UpdatedByID);
                // Tìm các Tag liên quan qua bảng trung gian newsTags
                const relatedTagIDs = newsTags
                    .filter(nt => nt.NewsArticleID === article.id)
                    .map(nt => nt.TagID);

                const articleTags = tags.filter(t => relatedTagIDs.includes(t.id));

                return {
                    ...article,
                    // Trả về cả ID và Name để dễ dàng quản lý hoặc hiển thị Badge
                    CategoryID: article.CategoryID,
                    CategoryName: category ? category.CategoryName : "N/A",
                    AuthorName: author ? author.AccountName : "Unknown",
                    AuthorID: author?.id,
                    EditorName: editor ? editor.AccountName : "Unknown",
                    EditorID: editor?.id,
                    tags: articleTags
                };
            });
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tin tức:", error);
            return [];
        }
    },
    // 2. Tạo bài viết mới kèm theo Tags
    createNews: async (data) => {
        const { Tags, ...newsData } = data;
        console.log("🚀 ~ newsData:", newsData)

        try {
            // Bước A: Tạo News Article
            const response = await axiosClient.post("/newsArticles", {
                ...newsData,
                CreatedDate: new Date().toISOString().split('T')[0],
                ModifiedDate: new Date().toISOString().split('T')[0],
            });

            const newArticle = response.data;

            // Bước B: Lưu các Tags vào bảng trung gian newsTags
            if (Tags && Tags.length > 0) {
                const tagPromises = Tags.map(tagId =>
                    axiosClient.post("/newsTags", {
                        NewsArticleID: newArticle.id,
                        TagID: tagId
                    })
                );
                await Promise.all(tagPromises);
            }

            return newArticle;
        } catch (error) {
            console.error("Error creating news:", error);
            throw error;
        }
    },

    // 3. Cập nhật bài viết và đồng bộ lại Tags
    updateNews: async (id, data) => {
        const { Tags, ...newsData } = data;
        console.log("🚀 ~ newsData:", newsData)

        // Cập nhật ModifiedDate theo ngày hiện tại
        const updateBody = {
            ...newsData,
            ModifiedDate: new Date().toISOString().split('T')[0]
        };

        try {
            // Bước A: Update bài viết chính trong bảng newsArticles
            const response = await axiosClient.put(`/newsArticles/${id}`, updateBody);
            const updatedArticle = response.data;

            if (Tags) {
                // Lấy danh sách các liên kết cũ của bài viết này
                const oldTagsRes = await axiosClient.get(`/newsTags?NewsArticleID=${id}`);

                const deletePromises = oldTagsRes.data.map(nt =>
                    axiosClient.delete(`/newsTags/${nt.id}`)
                );
                await Promise.all(deletePromises);

                // Thêm các liên kết Tag mới người dùng vừa chọn
                const addPromises = Tags.map(tagId =>
                    axiosClient.post("/newsTags", {
                        NewsArticleID: id,
                        TagID: tagId
                    })
                );
                await Promise.all(addPromises);
            }

            return updatedArticle;
        } catch (error) {
            console.error("Error updating news:", error);
            throw error;
        }
    },

    // 4. Xóa bài viết và các dữ liệu liên quan
    deleteNews: async (id) => {
        // Bước A: Xóa liên kết Tags trước để sạch DB
        const relatedTagsRes = await axiosClient.get(`/newsTags?NewsArticleID=${id}`);
        const deleteTagPromises = relatedTagsRes.data.map(nt =>
            axiosClient.delete(`/newsTags/${nt.id}`)
        );
        await Promise.all(deleteTagPromises);

        // Bước B: Xóa News Article
        const response = await axiosClient.delete(`/newsArticles/${id}`);
        return response.data;
    }
}

export default newsService;