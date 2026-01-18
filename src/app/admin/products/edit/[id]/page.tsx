import {getAdminProduct} from "@/app/actions/admin.actions";
import {notFound} from "next/dist/client/components/not-found";
import {ProductForm} from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await getAdminProduct(+id);

  if (!product) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Product #{id}</h1>
      <ProductForm product={product} />
    </div>
  )
}