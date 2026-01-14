"use server"

import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";


type UserUpdateData = {
  email: string;
  fullName?: string;
  phone?: string;
  address?: string;
  avatarUrl?: string;
  password?: string;
  oldPassword?: string;
}

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

export async function updateProfile(formData: UserUpdateData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return { error: 'Unauthorized' };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || 'Error updating profile' };
    }

    revalidatePath('/profile');
    return { success: true };
  } catch (error) {
    return { error: 'Server connection error' };
  }
}