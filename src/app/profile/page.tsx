import {getProfile, logoutAction} from "@/app/actions/auth.actions";
import {redirect} from "next/navigation";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Metadata} from "next";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {User, Order} from "@/types/product";
import {ProductCard} from "@/components/product/ProductCard";
import {getMyOrders} from "@/app/actions/order.actions";
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Profile | Volt Shop",
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export default async function ProfilePage() {
  const userData = getProfile();
  const ordersData = getMyOrders();

  const [user, orders] = await Promise.all([userData, ordersData]) as [User, Order[]];

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

        <Card className="h-fit max-h-[500px] flex flex-col">
          <CardHeader>
            <CardTitle>Order History ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent className="overflow-y-auto pr-2 flex-1">
            {orders.length === 0 ? (
              <div className="text-muted-foreground">
                You haven&#39;t placed any orders yet.
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold">Order #{order.id}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded 
                        ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                        order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 'bg-gray-100'}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="w-12 h-12 relative shrink-0 bg-muted rounded overflow-hidden border">
                          {item.product.imageUrl && (
                            <Image src={item.product.imageUrl} alt={item.product?.name || 'Product'} fill className="object-cover" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-bold">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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