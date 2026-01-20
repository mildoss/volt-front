"use server"

import { revalidatePath } from "next/cache";
import { fetchClient } from "@/lib/api";

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
  const res = await fetchClient(`/users/profile/favorites/${productId}`, {
    method: 'PATCH'
  });

  if (res?.error) return { error: res.error };

  revalidatePath(`/product/${productSlug}`);
  revalidatePath('/profile');
  return { success: true };
}

export async function updateProfile(formData: UserUpdateData) {
  const res = await fetchClient('/users/profile', {
    method: 'PATCH',
    body: JSON.stringify(formData)
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/profile');
  return { success: true };
}

export async function uploadFile(formData: FormData) {
  const res = await fetchClient('/media', {
    method: 'POST',
    body: formData
  });

  if (res?.error) return { error: res.error };
  return res;
}