'use server'

import {fetchClient} from "@/lib/api";
import {revalidatePath} from "next/cache";

export async function deleteProduct(id: number) {
  const res = await fetchClient(`/product/${id}`, {
    method: 'DELETE'
  })

  if (res?.error) return { error: res.error };

  revalidatePath('/admin/products');
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

export async function getAdminProduct(id: number) {
  const res = await fetchClient(`/products/by-id/${id}`, {
    cache: 'no-store'
  });

  if (res?.error) return null;
  return res;
}

export async function createProduct(data: any) {
  const res = await fetchClient('/products', {
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/admin/products');
  return { success: true };
}

export async function updateProduct(id: number, data: any) {
  const res = await fetchClient(`/products/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });

  if (res?.error) return { error: res.error };

  revalidatePath('/admin/products');
  return { success: true };
}