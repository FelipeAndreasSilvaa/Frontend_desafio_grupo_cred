import api from "./api";


export const createOrder = (data: {
  userId: number;
  descricao: string;
}) => api.post("/order", data);


export const getOrders = () =>
  api.get("/order");

export const getOrdersByUser = (userId: number) =>
  api.get(`/order/user/${userId}`);


export const updateOrder = (id: number, data: any) =>
  api.patch(`/order/${id}`, data);


export const deleteOrder = (id: number) =>
  api.delete(`/order/${id}`);