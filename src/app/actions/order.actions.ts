'use server'

import { revalidatePath } from "next/cache";
import { fetchClient } from "@/lib/api";
import {Order, OrderStatus, PaginationResponse} from "@/types/product";

export type CheckoutFormData = {
  address: string;
  phone: string;
  comment?: string;
}

export async function placeOrder(data: CheckoutFormData) {
  const res = await fetchClient('/orders', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/', 'layout');
  return { success: true };
}

export async function getMyOrders() {
  const res = await fetchClient('/orders');
  if (res?.error) return [];
  return res;
}

export async function getAdminOrders(searchParams: string): Promise<PaginationResponse<Order>> {
  const res = await fetchClient(`/orders/all?${searchParams}`, { cache: 'no-store' });
  if (res?.error) return { items: [], length: 0 };
  return res as PaginationResponse<Order>;
}

export async function updateOrderStatus(id: number, status: OrderStatus) {
  const res = await fetchClient(`/orders/status/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/admin/orders');
  return { success: true };
}