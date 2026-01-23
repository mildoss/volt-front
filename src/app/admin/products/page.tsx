import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AdminProductList } from "@/components/admin/AdminProductList";
import {PaginationResponse, Product} from "@/types/product";
import {fetchClient} from "@/lib/api";
import {Pagination} from "@/components/ui/Pagination";

const getAdminProducts = async (searchParams: string): Promise<PaginationResponse<Product>> => {
  const res = await fetchClient(`/products/admin/all?${searchParams || ''}`, {
    cache: 'no-store'
  });

  if (res?.error) return { items: [], length: 0 };

  return res as PaginationResponse<Product>;
}
export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<string> }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();

  const data= await getAdminProducts(queryString);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products ({data.length})</h1>
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
          {data.items.map((product) => (
            <AdminProductList key={product.id} product={product} />
          ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="p-10 text-center text-muted-foreground">
            No products found.
          </div>
        )}
      </div>

      <Pagination length={data.length} />
    </div>
  )
}