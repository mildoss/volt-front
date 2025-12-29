import {Product} from "@/types/product";
import {ProductCard} from "@/components/product/ProductCard";
import {ProductFilters} from "@/components/product/ProductFilters";

const getProducts = async (searchParams: {sort?: string, searchTerm?: string}) => {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?${params.toString()}`,
    {cache: 'no-store'}
  );

  if (!res.ok) throw new Error('Failed to fetch products')

  return res.json();
}

type Props = {
  searchParams: Promise<{[key: string]: string | undefined}>
}

export default async function ProductPage({searchParams}: Props) {
  const params = await searchParams;
  const products: Product[] = await getProducts(params);

  return (
    <div className="flex-1 mt-8 pb-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Catalog of products</h2>

        <ProductFilters/>

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
    </div>
  );
}
