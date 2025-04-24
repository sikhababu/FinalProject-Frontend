import userInstance from "../axios/axiosinstance";


export const getSellers = () => userInstance.get('/seller/list');
export const addSeller = (data) => userInstance.post('/seller/create', { ...data});
export const updateSeller = (id, data) => userInstance.put(`/seller/update/${id}`, data);
export const deleteSeller = (id) => userInstance.delete(`/seller/delete/${id}`);
