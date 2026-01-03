import Link from "next/link";
import {getProfile} from "@/app/actions/auth.actions";
import {getCart} from "@/app/actions/cart.action";
import {CartSheet} from "@/components/cart/CartSheet";

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
            
            <Link
              href="/profile"
              className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center
              font-bold text-lg hover:opacity-90 transition-opacity"
            >
              {user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
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