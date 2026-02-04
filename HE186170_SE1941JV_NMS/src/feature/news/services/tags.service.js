import axiosClient from "@/shared/services/axiosClient";

const tagsService = {
    findAll: async () => {
        const response = await axiosClient.get("/tags");
        return response.data;
    }
}

export default tagsService;