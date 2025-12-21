import {Product} from "@/types/product";
import Link from "next/link";
import {ProductGallery} from "@/components/product/ProductGallery";
import {ProductInfo} from "@/components/product/ProductInfo";
import {ProductReviews} from "@/components/product/ProductReviews";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>
}

const getProductInfo = async (slug: string) => {
  const res = await fetch(`http://localhost:4000/products/${slug}`, {cache: "no-store", next: {tags: ['product']}})

  if (!res.ok) throw new Error('Failed to fetch product info');

  return res.json();
}

export default async function ProductPage({params}: ProductPageProps) {
  const {slug} = await params;
  const product: Product = await getProductInfo(slug);

  return (
    <main className="min-h-screen bg-background pb-10">
      <div className="container mx-auto px-4">
        <div className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Catalog</Link>
          {' / '}
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-10">
          <ProductGallery product={product}/>
          <ProductInfo product={product}/>
        </div>

        <ProductReviews reviews={product.reviews} productId={product.id}/>
      </div>
    </main>
  )
}