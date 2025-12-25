import Link from "next/link";
import {ProductGallery} from "@/components/product/ProductGallery";
import {ProductInfo} from "@/components/product/ProductInfo";
import {ProductReviews} from "@/components/product/ProductReviews";
import {getProfile} from "@/app/actions/auth.actions";
import {Product, User} from "@/types/product";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>
}

const getProductInfo = async (slug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`, {cache: "no-store"})

  if (!res.ok) throw new Error('Failed to fetch product info');

  return res.json();
}

export default async function ProductPage({params}: ProductPageProps) {
  const {slug} = await params;
  const productData = getProductInfo(slug);
  const userData = getProfile();

  const [product, user] = await Promise.all([productData, userData]) as [Product, User | null];
  const isFavorite = user?.favorites?.some((fav) => fav.id === product.id) ?? false;

  return (
    <div className="flex-1 mt-8 pb-10">
      <div className="container mx-auto px-4">
        <div className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Catalog</Link>
          {' / '}
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-10">
          <ProductGallery product={product}/>
          <ProductInfo
            product={product}
            isFavorite={isFavorite}
            isLoggedIn={!!user}
          />
        </div>

        <ProductReviews reviews={product.reviews} productId={product.id} productSlug={product.slug}/>
      </div>
    </div>
  )
}