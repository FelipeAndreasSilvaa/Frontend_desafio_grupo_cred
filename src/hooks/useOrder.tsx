import { useState } from "react";
import api from "@/service/api";

export function useOrders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);

  async function getOrders() {
    setLoading(true);

    const res = await api.get("/order");
    setOrders(res.data);

    setLoading(false);
    return res.data;
  }

  async function getOrdersByUser(id: number) {
    setLoading(true);

    const res = await api.get(`/order/user/${id}`);
    setOrders(res.data);

    setLoading(false);
    return res.data;
  }

  async function createOrder(data: any) {
    try {
      setLoading(true);

      await api.post("/order", data);
      await getOrders();

    } finally {
      setLoading(false);
    }
  }

  // ✅ UPDATE
  async function updateOrder(id: number, data: any) {
    try {
      setLoading(true);

      await api.patch(`/order/${id}`, data);
      await getOrders();

    } finally {
      setLoading(false);
    }
  }

  // ✅ DELETE
  async function deleteOrder(id: number) {
    try {
      setLoading(true);

      await api.delete(`/order/${id}`);
      await getOrders();

    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    orders,
    getOrders,
    getOrdersByUser,
    createOrder,
    updateOrder,  
    deleteOrder,  
  };
}