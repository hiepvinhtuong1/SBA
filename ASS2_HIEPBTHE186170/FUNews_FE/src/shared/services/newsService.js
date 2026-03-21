import axiosClient from './axiosClient';

const newsService = {
  getAll: () => axiosClient.get('/news'),
  getById: (id) => axiosClient.get(`/news/${id}`),
  create: (data) => axiosClient.post('/news', data),
  update: (id, data) => axiosClient.put(`/news/${id}`, data),
  delete: (id) => axiosClient.delete(`/news/${id}`),
  search: (keyword) => axiosClient.get(`/news/search?keyword=${keyword}`),
  getByCategory: (categoryId) => axiosClient.get(`/news/category/${categoryId}`),
};

export default newsService;
