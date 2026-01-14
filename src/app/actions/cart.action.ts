'use server'

import { revalidatePath } from "next/cache";
import { fetchClient } from "@/lib/api";

export async function getCart() {
  const res = await fetchClient('/cart');
  if (res?.error) return null;
  return res;
}

export async function addToCart(productId: number, quantity = 1) {
  const res = await fetchClient('/cart/add', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity })
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/', 'layout');
  return { success: true };
}

export async function updateQuantity(itemId: number, type: 'plus' | 'minus') {
  const res = await fetchClient(`/cart/count/${itemId}`, {
    method: 'PATCH',
    body: JSON.stringify({ type })
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/', 'layout');
  return { success: true };
}

export async function removeFromCart(itemId: number) {
  const res = await fetchClient(`/cart/${itemId}`, {
    method: 'DELETE'
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/', 'layout');
  return { success: true };
}