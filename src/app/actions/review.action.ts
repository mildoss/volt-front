'use server'

import { revalidatePath } from "next/cache";
import { fetchClient } from "@/lib/api";

export async function leaveReview(productId: number, productSlug: string, formData: FormData) {
  const rating = formData.get('rating');
  const text = formData.get('text');

  const res = await fetchClient(`/reviews/leave/${productId}`, {
    method: 'POST',
    body: JSON.stringify({
      rating: Number(rating),
      text: text
    })
  });

  if (res?.error) {
    return { error: res.error };
  }

  revalidatePath(`/product/${productSlug}`);
  return { success: true };
}