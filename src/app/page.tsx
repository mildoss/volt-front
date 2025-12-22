import {Product} from "@/types/product";
import {ProductCard} from "@/components/product/ProductCard";

const getProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {cache: 'no-store'});

  if (!res.ok) throw new Error('Failed to fetch products')

  return res.json();
}

export default async function ProductPage() {
  const products: Product[] = await getProducts();

  return (
    <main className="min-h-screen bg-background pb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Catalog of products</h2>

        {products.length === 0 ? (
          <div className="text-center text-muted-foreground mt-10">No products yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
