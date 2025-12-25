"use server"

import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export async function toggleFavorite(productId: number, productSlug: string) {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('token');
  const token = tokenCookie?.value;

  if (!token) return { error: 'Unauthorized' };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile/favorites/${productId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!res.ok) return { error: 'Error toggling favorite' }

    revalidatePath(`/product/${productSlug}`);
    revalidatePath('/profile');

    return { success: true };
  } catch (err) {
    return { error: 'Server connection error' }
  }
}