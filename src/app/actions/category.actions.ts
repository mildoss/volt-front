'use server'
import { fetchClient } from "@/lib/api";
import {revalidatePath} from "next/cache";

export async function getCategories() {
  const res = await fetchClient('/categories', { cache: 'force-cache' });
  if (res?.error) return [];
  return res;
}

export async function createCategory(name: string) {
  const res = await fetchClient('/categories', {
    method: 'POST',
    body: JSON.stringify({name})
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/admin/products/create');
  revalidatePath('/admin/products/edit/[id]');
  return { success: true, category: res };
}

export async function deleteCategory(id: number) {
  const res = await fetchClient(`/categories/${id}`, {
    method: 'DELETE'
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/admin/products/create');
  revalidatePath('/admin/products/edit/[id]');
  return { success: true };
}