import {Product} from "@/types/product";
import Image from "next/image";
import Link from "next/link";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>
}

const getProductInfo = async (slug: string) => {
  const res = await fetch(`http://localhost:4000/products/${slug}`, {cache: "no-store"})

  if (!res.ok) throw new Error('Failed to fetch product info')

  return res.json();
}

export default async function ProductPage({params}: ProductPageProps) {
  const {slug} = await params;
  const product: Product = await getProductInfo(slug);

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
        <div className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Catalog</Link>
          {' / '}
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-10">
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
              <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded mb-1">
                In Stock
              </span>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              {product.description || "No description yet."}
            </p>

            <div className="flex gap-4">
              <button
                className="flex-1 bg-primary text-primary-foreground font-medium py-4 px-6 rounded-lg hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20 active:scale-95 transform duration-100 cursor-pointer">
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
        </div>


        <div className="flex flex-col gap-8">

          <div className="flex items-center justify-between">
            <h2 className="text-foreground text-2xl md:text-3xl font-bold">Reviews ({3})</h2>
            <button className="text-primary font-medium hover:underline text-sm cursor-pointer">Write a review</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div
              className="bg-card border-border p-6 rounded-xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">JD
                </div>
                <h3 className="font-bold text-sm text-foreground">John Doe</h3>
                <div className="text-yellow-500 text-xs tracking-widest">★★★★★</div>
                <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-muted-foreground text-sm">This stuff is amazing. I enjoy it</p>
            </div>

            <div
              className="bg-card border-border p-6 rounded-xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">JD
                </div>
                <h3 className="font-bold text-sm text-foreground">John Doe</h3>
                <div className="text-yellow-500 text-xs tracking-widest">★★★★★</div>
                <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-muted-foreground text-sm">This stuff is amazing. I enjoy it</p>
            </div>

            <div
              className="bg-card border-border p-6 rounded-xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">JD
                </div>
                <h3 className="font-bold text-sm text-foreground">John Doe</h3>
                <div className="text-yellow-500 text-xs tracking-widest">★★★★★</div>
                <span className="ml-auto text-xs text-muted-foreground">2 days ago</span>
              </div>
              <p className="text-muted-foreground text-sm">This stuff is amazing. I enjoy it</p>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}