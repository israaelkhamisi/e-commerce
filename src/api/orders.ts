import type { IOrder } from "src/interfaces/order.interface";
import type { ApiResponse } from "src/types/api.types";

export async function getOrders(): Promise<ApiResponse<IOrder[]>> {
  const res = await fetch("/api/orders");
  return res.json();
}

export async function getOrder(id: string): Promise<ApiResponse<IOrder>> {
  const res = await fetch(`/api/orders/${id}`);
  return res.json();
}
