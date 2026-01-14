'use server'

import { revalidatePath } from "next/cache";
import { fetchClient } from "@/lib/api";

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