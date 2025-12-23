import Link from "next/link";
import {getProfile} from "@/app/actions/auth.actions";

export const Header = async () => {
  const user = await getProfile();

  return (
    <header className="bg-card border-b border-border py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Volt Shop ⚡️</h1>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium hidden md:block">
              Hi, {user.fullName || user.email}
            </span>
            
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