'use server'

import {cookies} from "next/headers";
import {revalidatePath, revalidateTag} from "next/cache";

export async function leaveReview(productId: number, productSlug: string, formData: FormData) {
  const rating = formData.get('rating');
  const text = formData.get('text');

  const cookieStore = await cookies();

  const token = cookieStore.get('token')?.value;

  if (!token) {
    return { error: 'You must be logged in to leave a review' };
  }

  try {
    const res = await fetch(`http://localhost:4000/reviews/leave/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        rating: Number(rating),
        text: text
      })
    })

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || 'Error sending' };
    }

    revalidatePath(`/product${productSlug}`)
    return { success: true }

  } catch (e) {
    return { error: 'Server connection error' }
  }
}