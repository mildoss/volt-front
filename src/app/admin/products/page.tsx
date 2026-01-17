import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminProductList } from "@/components/admin/AdminProductList";
import { Product } from "@/types/product";
import {fetchClient} from "@/lib/api";

const getAdminProducts = async () => {
  const res = await fetchClient('/products/admin/all', {
    cache: 'no-store'
  });

  if (res?.error) return [];
  return res as Product[];
}
export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products ({products.length})</h1>
        <Link href="/admin/products/create">
          <Button className="cursor-pointer">
            <Plus size={18} />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
          <tr>
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Stock</th>
            <th className="px-6 py-4">Author</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-border">
          {products.map((product) => (
            <AdminProductList key={product.id} product={product} />
          ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-10 text-center text-muted-foreground">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}