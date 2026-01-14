'use server'

import { cookies } from "next/headers";

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
}

export const fetchClient = async (path: string, options: FetchOptions = {}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    cache: options.cache || 'no-store'
  });

  if (res.status === 204) {
    return { success: true };
  }

  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }

  if (!res.ok) {
    return { error: data?.message || 'Something went wrong' };
  }

  return data;
}