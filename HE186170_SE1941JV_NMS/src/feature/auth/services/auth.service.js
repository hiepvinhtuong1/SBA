import axiosClient from "@/shared/services/axiosClient";

const authService = {
    login: async (email, password) => {
        // Với json-server, chúng ta sẽ giả lập tìm user khớp email và pass
        const response = await axiosClient.get(`/systemAccounts?AccountEmail=${email}&AccountPassword=${password}`);
        return response.data;
    }
};

export default authService;