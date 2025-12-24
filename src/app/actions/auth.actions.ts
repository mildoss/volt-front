'use server'

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {TypeLoginSchema} from "@/components/auth/LoginForm";
import {TypeRegisterSchema} from "@/components/auth/RegisterForm";

export async function loginAction(values: TypeLoginSchema) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {error: errorData?.message || 'Login error'}
    }

    const data = await res.json();
    const cookieStore = await cookies();

    cookieStore.set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    })

  } catch (err) {
    return {error: 'Error connecting to the server'}
  }

  redirect('/');
};

export async function registerAction(values: TypeRegisterSchema) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {error: errorData?.message || 'Register error'}
    }

    const data = await res.json();
    const cookieStore = await cookies();

    cookieStore.set('token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    })
  } catch (err) {
    return {error: 'Error connecting to the server'}
  }

  redirect('/');
}

export async function getProfile() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('token');
  const token = tokenCookie?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/');
}