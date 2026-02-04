import axiosClient from "@/shared/services/axiosClient";

const categoryService = {
    findAll: async () => {
        const response = await axiosClient.get("/categories");
        return response.data;
    },

    createCategory: async (data) => {
        const response = await axiosClient.post("/categories", data);
        return response.data
    },

    updateCategory: async (data, id) => {
        const response = await axiosClient.put(`/categories/${id}`, data);
        return response.data
    },

    deleteCategory: async (id) => {
        const response = await axiosClient.delete(`/categories/${id}`);
        return response.data
    }
}

export default categoryService;