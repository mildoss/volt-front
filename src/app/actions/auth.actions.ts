'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {TypeLoginSchema} from "@/components/auth/LoginForm";
import {TypeRegisterSchema} from "@/components/auth/RegisterForm";
import { fetchClient } from "@/lib/api"; // 👈

async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 30 * 24 * 60 * 60,
  });
}

export async function loginAction(values: TypeLoginSchema) {
  const data = await fetchClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  if (data?.error) return { error: data.error };

  await setAuthCookie(data.token);
  redirect('/');
};

export async function registerAction(values: TypeRegisterSchema) {
  const data = await fetchClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(values),
  });

  if (data?.error) return { error: data.error };

  await setAuthCookie(data.token);
  redirect('/');
}

export async function getProfile() {
  const data = await fetchClient('/users/profile');
  if (data?.error) return null;
  return data;
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/');
}