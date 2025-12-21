import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-card border-b border-border py-4 mb-8">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Volt Shop ⚡️</h1>
        <Link href="/auth" className="text-sm font-medium hover:text-primary transition-colors">
          Login
        </Link>
      </div>
    </header>
  )
}