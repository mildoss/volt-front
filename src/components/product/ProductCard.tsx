import {Product} from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({product}: { product: Product }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="bg-card border border-transparent hover:border-border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group block"
    >
      <div className="h-48 bg-muted flex items-center justify-center relative overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-muted-foreground">No photo</span>
        )}
      </div>

      <div className="p-4">
        <div className="text-xs text-primary font-semibold mb-1">
          {product.category?.name || 'No category'}
        </div>
        <h3 className="font-bold text-lg mb-2 truncate text-foreground">{product.name}</h3>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold text-foreground">
            {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price)}
          </span>
        </div>
      </div>
    </Link>
  )
}
