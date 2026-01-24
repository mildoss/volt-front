'use server'
import { fetchClient } from "@/lib/api";

export async function getCategories() {
  const res = await fetchClient('/categories', { cache: 'force-cache' });
  if (res?.error) return [];
  return res;
}