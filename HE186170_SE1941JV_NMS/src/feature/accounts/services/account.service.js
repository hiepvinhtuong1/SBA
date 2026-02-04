import axiosClient from "@/shared/services/axiosClient";

const accountService = {
    findAll: async () => {
        const response = await axiosClient.get("/systemAccounts");
        return response.data;
    },
    create: async (data) => {
        const response = await axiosClient.post("/systemAccounts", data);
        return response.data;
    },
    update: async (id, data) => {
        const response = await axiosClient.put(`/systemAccounts/${id}`, data);
        return response.data;
    },
    delete: async (id) => {
        const response = await axiosClient.delete(`/systemAccounts/${id}`);
        return response.data;
    }
};
export default accountService;