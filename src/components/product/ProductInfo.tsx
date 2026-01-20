import {Product} from "@/types/product";
import {FavoriteButton} from "@/components/product/FavoriteButton";
import {AddToCartButton} from "@/components/product/AddToCartButton";
import {formatPrice} from "@/lib/utils";

type ProductInfoProps = {
  product: Product;
  isFavorite: boolean;
  isLoggedIn: boolean;
}

export const ProductInfo = ({product, isFavorite, isLoggedIn}: ProductInfoProps) => {
  const isAvailable = product.stock > 0;

  return (
    <div className="flex flex-col">
      <div className="text-primary font-medium mb-2 tracking-wide uppercase text-xs">
        {product.category?.name || 'Electronics'}
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-foreground leading-tight">
        {product.name}
      </h1>

      <div className="flex items-end gap-4 mb-6">
        <div className="text-3xl font-bold text-foreground">
          {formatPrice(product.price)}
        </div>
        {isAvailable ? (
          <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded mb-1">
          In Stock: {product.stock}
        </span>
        ) : (
          <span className="text-xs font-bold text-destructive-foreground bg-destructive px-2 py-1 rounded mb-1">
          Not available
        </span>
        )}
      </div>

      <p className="text-muted-foreground leading-relaxed mb-8 text-base">
        {product.description || "No description yet."}
      </p>

      {product.specs && Object.keys(product.specs).length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold mb-3">Specifications:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {Object.entries(product.specs).map(([key, value]) => (
              <li key={key} className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-muted-foreground">{key}:</span>
                <span className="font-medium text-right ml-2">{value as string}</span>
              </li>
            ))}
          </ul>
      </div>
     )}

      <div className="flex gap-4">
        <AddToCartButton
          productId={product.id}
          isAvailable={isAvailable}
          isLoggedIn={isLoggedIn}
        />
        <FavoriteButton
          productId={product.id}
          productSlug={product.slug}
          isFavorite={isFavorite}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-4 text-sm">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Delivery:</span>
          <p className="font-medium text-foreground">1-2 business days</p>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground">Guarantee:</span>
          <p className="font-medium text-foreground">Official 12 months</p>
        </div>
      </div>
    </div>
  )
}