import Image from "next/image";
import {Product} from "@/types/product";

export const ProductGallery = ({ product }: { product: Product }) => {
  return (
    <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden shadow-sm border border-border">
      {product.imageUrl ? (
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          No photo
        </div>
      )}
    </div>
  )
}