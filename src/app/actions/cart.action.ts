'use server'

import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

const getHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}

export async function getCart() {
  const headers = await getHeaders();

  if (!headers.Authorization.includes('Bearer undefined')) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
        method: 'GET',
        headers
      });
      if (!res.ok) return null;
      return res.json();
    } catch (error) {
      return null;
    }
  }
}

export async function addToCart(productId: number, quantity = 1) {
  const headers = await getHeaders();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/add`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ productId, quantity })
    });

    if (!res.ok) return { error: 'Error adding to cart' };

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Server error' };
  }
}

export async function updateQuantity(itemId: number, type: 'plus' | 'minus') {
  const headers = await getHeaders();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/count/${itemId}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ type })
    });

    if (!res.ok) return { error: 'Error updating quantity' };

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Server error' };
  }
}

export async function removeFromCart(itemId: number) {
  const headers = await getHeaders();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart/${itemId}`, {
      method: 'DELETE',
      headers
    });

    if (!res.ok) return { error: 'Error removing item' };

    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    return { error: 'Server error' };
  }
}