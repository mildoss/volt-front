'use client'

import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { deleteProduct } from "@/app/actions/admin.actions";
import { toast } from "sonner";
import { useTransition } from "react";
import Link from "next/link";

export const AdminProductList = ({ product }: { product: Product }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if(!confirm('Are you sure?')) return;

    startTransition(async () => {
      const res = await deleteProduct(product.id);
      if(res?.error) toast.error(res.error);
      else toast.success('Product deleted');
    });
  }

  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="px-6 py-4">
        <div className="w-12 h-12 bg-muted rounded-md relative overflow-hidden border">
          {product.imageUrl && <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />}
        </div>
      </td>
      <td className="px-6 py-4 font-medium">{product.name}</td>
      <td className="px-6 py-4">{formatPrice(product.price)}</td>
      <td className="px-6 py-4">
        <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500 font-bold'}>
          {product.stock}
        </span>
      </td>
      <td className="px-6 py-4 text-xs text-muted-foreground">
        {product.user?.fullName || product.user?.email || 'System'}
      </td>
      <td className="px-6 py-4 text-xs">
        <div className="flex flex-col gap-2">
          <span>Created: {new Date(product.createdAt).toLocaleDateString()}</span>
          <span className="text-muted-foreground">Upd: {new Date(product.updatedAt).toLocaleDateString()}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-right flex justify-end gap-2">
        <Link href={`/admin/products/edit/${product.id}`}>
          <Button variant="outline" size="icon-sm" className="cursor-pointer">
            <Pencil size={16} />
          </Button>
        </Link>
        <Button
          variant="destructive"
          size="icon-sm"
          onClick={handleDelete}
          disabled={isPending}
          className="cursor-pointer"
        >
          <Trash2 size={16} />
        </Button>
      </td>
    </tr>
  )
}