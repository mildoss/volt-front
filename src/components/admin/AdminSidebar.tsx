'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, ShoppingBag, Star, ArrowLeft } from "lucide-react";

const MENU = [
  { name: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { name: 'Products', url: '/admin/products', icon: Package },
  { name: 'Orders', url: '/admin/orders', icon: ShoppingBag },
  { name: 'Reviews', url: '/admin/reviews', icon: Star },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-border bg-card p-6 flex flex-col">
      <div className="text-2xl font-bold text-primary mb-10 pl-2">
        Admin Panel
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {MENU.map((item) => (
          <Link
            key={item.url}
            href={item.url}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium",
              pathname === item.url
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon size={20} />
            {item.name}
          </Link>
        ))}
      </nav>

      <Link
        href="/"
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mt-auto font-medium"
      >
        <ArrowLeft size={20} />
        Back to Shop
      </Link>
    </div>
  )
}