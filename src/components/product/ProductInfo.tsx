import {Product} from "@/types/product";

export const ProductInfo = ({ product }: { product: Product }) => {
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
          {new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(product.price)}
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

      <div className="flex gap-4">
        <button
          disabled={!isAvailable}
          className={`flex-1  font-medium py-4 px-6 rounded-lg 
          transition-colors shadow-lg transform duration-100
          ${isAvailable 
            ? 'bg-primary text-primary-foreground hover:bg-blue-600 shadow-blue-500/20 active:scale-95 cursor-pointer' 
            : 'bg-muted text-muted-foreground cursor-not-allowed'}`}
        >
          Add to cart
        </button>
        <button
          className="px-6 py-4 border border-border rounded-lg hover:bg-muted text-foreground transition-colors active:scale-95 cursor-pointer">
          ♥
        </button>
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