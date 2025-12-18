import Link from "next/link";
import Image from 'next/image'
import {Product} from "@/types/product";

const getProducts = async () => {
  const res = await fetch('http://localhost:4000/products', {cache: 'no-store'});

  if (!res.ok) throw new Error('Failed to fetch products')

  return res.json();
}

export default async function ProductPage() {
  const products: Product[] = await getProducts();

  return (
    <main className="min-h-screen bg-background pb-10">
      <header className="bg-card border-b border-border py-4 mb-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Volt Shop ⚡️</h1>
          <Link href="/auth" className="text-sm font-medium hover:text-primary transition-colors">
            Login
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Catalog of products</h2>

        {products.length === 0 ? (
          <div className="text-center text-muted-foreground mt-10">No products yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
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
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
