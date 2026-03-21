import axiosClient from './axiosClient';

const tagService = {
  getAll: () => axiosClient.get('/tags'),
  getById: (id) => axiosClient.get(`/tags/${id}`),
  create: (data) => axiosClient.post('/tags', data),
  update: (id, data) => axiosClient.put(`/tags/${id}`, data),
  delete: (id) => axiosClient.delete(`/tags/${id}`),
};

export default tagService;
