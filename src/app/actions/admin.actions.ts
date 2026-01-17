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