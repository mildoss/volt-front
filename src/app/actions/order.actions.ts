'use server'

import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";

export type CheckoutFormData = {
  address: string;
  phone: string;
  comment?: string;
}

export async function placeOrder(data: CheckoutFormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return { error: 'Unauthorized' };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { error: errorData.message || 'Error creating order' };
    }

    revalidatePath('layout');
    return { success: true };
  } catch (error) {
    return { error: 'Server connection error' };
  }
}