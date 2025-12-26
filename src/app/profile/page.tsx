import {getProfile, logoutAction} from "@/app/actions/auth.actions";
import {redirect} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Metadata} from "next";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {User} from "@/types/product";
import {ProductCard} from "@/components/product/ProductCard";

export const metadata: Metadata = {
  title: "Profile | Volt Shop",
};

export default async function ProfilePage() {
  const user: User = await getProfile();

  if (!user) redirect('/auth');

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Info</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center
                justify-center text-primary text-3xl font-bold">
                {user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.fullName || 'Anonymous'}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-xs text-muted-foreground mt-1">ID: {user.id}</p>
              </div>
            </div>

            <div className="flex items-center pt-4 gap-2">
              <Link href="/profile/edit">
                <Button className="cursor-pointer" variant="outline">Edit Info</Button>
              </Link>
              <form action={logoutAction}>
                <Button className="cursor-pointer" variant="destructive" type="submit">Logout</Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card className="opacity-60">
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You haven&#39;t placed any orders yet.</p>
            <Button variant="link" className="px-0 mt-2" disabled>
              View all orders (Coming soon)
            </Button>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">My Favorites ({user.favorites?.length || 0})</h2>

        {(!user.favorites || user.favorites.length === 0) ? (
        <div className="text-muted-foreground">
          You haven&#39;t added any products to favorites yet.
          <Link href="/" className="text-primary hover:underline ml-1">Go to catalog</Link>
        </div>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {user.favorites?.map((product => (
            <ProductCard key={product.id} product={product}/>
          )))}
        </div>
        )}
      </div>
    </div>
  )
}