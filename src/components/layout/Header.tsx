import Link from "next/link";
import {getProfile} from "@/app/actions/auth.actions";
import {getCart} from "@/app/actions/cart.action";
import {CartSheet} from "@/components/cart/CartSheet";
import {UserAvatar} from "@/components/ui/user-avatar";

export const Header = async () => {
  const userData = getProfile();
  const cartData = getCart();

  const [user, cart] = await Promise.all([userData, cartData]);

  return (
    <header className="bg-card border-b border-border py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary tracking-tighter">Volt Shop ⚡️</Link>
        {user ? (
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-sm font-medium hidden md:block">
              Hi, {user.fullName || user.email}
            </span>

            <CartSheet cart={cart} />

            <div className="h-6 w-px bg-border mx-1"></div>

            <Link href="/profile">
              <UserAvatar user={user} size={40} />
            </Link>
          </div>
          )
        : (
        <Link href="/auth" className="text-sm font-medium hover:text-primary transition-colors">
          Login
        </Link>
        )}
      </div>
    </header>
  )
}