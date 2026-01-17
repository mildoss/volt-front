import { getProfile } from "@/app/actions/auth.actions";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import type { Metadata } from "next";
import {ReactNode} from "react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Volt Shop",
};

export default async function AdminLayout({children}: {children: ReactNode;}) {
  const user = await getProfile();

  if (!user || user.role !== 'ADMIN') {
    return redirect('/');
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-muted/20">
        {children}
      </main>
    </div>
  );
}