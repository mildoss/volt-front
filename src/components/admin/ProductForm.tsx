'use client'

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {ChangeEvent, ReactNode, useEffect, useState, useTransition} from "react";
import { createProduct, updateProduct, uploadFile } from "@/app/actions/admin.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Trash2, Plus, X } from "lucide-react";
import Image from "next/image";
import {createCategory, deleteCategory, getCategories} from "@/app/actions/category.actions";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock is required"),
  categoryId: z.string().min(1, "Category ID is required"),
  imageUrl: z.string().optional(),
  specs: z.array(z.object({
    key: z.string().min(1, "Key required"),
    value: z.string().min(1, "Value required")
  })).optional()
});

type TypeProductForm = z.infer<typeof formSchema>;

export const ProductForm = ({ product }: { product?: Product }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const initialSpecs = product?.specs
    ? Object.entries(product.specs).map(([key, value]) => ({ key, value }))
    : [];

  const form = useForm<TypeProductForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price?.toString() || '',
      stock: product?.stock?.toString() || '',
      categoryId: product?.category?.id?.toString() || '1',
      imageUrl: product?.imageUrl || '',
      specs: initialSpecs
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "specs"
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;

    const res = await createCategory(newCategoryName);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Category created!');
      setCategories([...categories, res.category]);
      form.setValue('categoryId', res.category.id.toString());
      setIsCategoryModalOpen(false);
      setNewCategoryName('');
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if(!confirm('Are you sure?')) return;

    const res = await deleteCategory(id);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Category deleted');
      setCategories(categories.filter(c => c.id !== id));

      if (form.getValues('categoryId') === id.toString()) {
        form.setValue('categoryId', '');
      }
    }
  };

  const onSubmit: SubmitHandler<TypeProductForm> = (values) => {
    const specsObject = values.specs?.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, string>);

    const dataToSend = {
      name: values.name,
      description: values.description,
      price: Number(values.price),
      stock: Number(values.stock),
      categoryId: Number(values.categoryId),
      imageUrl: values.imageUrl,
      specs: specsObject
    };

    startTransition(async () => {
      let res;
      if (product) {
        res = await updateProduct(product.id, dataToSend);
      } else {
        res = await createProduct(dataToSend);
      }

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success(product ? 'Product updated' : 'Product created');
        router.push('/admin/products');
        router.refresh();
      }
    });
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    formData.append('media', files[0]);

    const loadingToast = toast.loading('Uploading image...');
    const res = await uploadFile(formData);
    toast.dismiss(loadingToast);

    if (res?.error) {
      toast.error(res.error);
    } else {
      form.setValue('imageUrl', res.url);
      toast.success('Image uploaded');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full bg-card p-6 rounded-xl border shadow-sm">

        <div className="space-y-4">
          <FormLabel>Product Image</FormLabel>
          <div className="flex items-center gap-4">
            {form.watch('imageUrl') ? (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                <Image src={form.watch('imageUrl')!} alt="Preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => form.setValue('imageUrl', '')}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full cursor-pointer hover:bg-red-600"
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground border border-dashed">
                No image
              </div>
            )}

            <div className="flex-1">
              <Input
                type="file"
                onChange={handleUpload}
                className="cursor-pointer"
                disabled={isPending}
                accept="image/*"
              />
              <p className="text-xs text-muted-foreground mt-2">Upload image to Cloudinary</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl><Input placeholder="iPhone 15 Pro" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between items-center">
                  Category
                  <span
                    onClick={() => setIsCategoryModalOpen(true)}
                    className="text-xs text-primary cursor-pointer hover:underline"
                  >
                    + Add New
                  </span>
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat: {id: number, name: string}) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl><Input type="number" placeholder="999" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock (Qty)</FormLabel>
                <FormControl><Input type="number" placeholder="10" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl><Textarea placeholder="Great phone..." className="h-32" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4 border-t pt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Specifications</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ key: '', value: '' })}
              className="cursor-pointer"
            >
              <Plus size={16} className="mr-2" /> Add Spec
            </Button>
          </div>

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-end">
                <FormField
                  control={form.control}
                  name={`specs.${index}.key`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl><Input placeholder="Name (e.g. RAM)" {...field} /></FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`specs.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl><Input placeholder="Value (e.g. 16GB)" {...field} /></FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="text-destructive hover:bg-destructive/10 cursor-pointer"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
            {fields.length === 0 && (
              <p className="text-sm text-muted-foreground italic">No specifications added yet.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <Button type="button" variant="outline" className="w-full md:w-1/2 cursor-pointer" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" className="w-full md:w-1/2 cursor-pointer" disabled={isPending}>
            {isPending ? 'Saving...' : (product ? 'Update Product' : 'Create Product')}
          </Button>
        </div>

      </form>

      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Categories</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">

            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Label className="mb-2 block">New Category Name</Label>
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="e.g. Tablets"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreateCategory()}
                />
              </div>
              <Button onClick={handleCreateCategory} disabled={!newCategoryName.trim()}>
                <Plus size={16} />
              </Button>
            </div>

            <div className="h-px bg-border my-2" />

            <div className="max-h-[200px] overflow-y-auto space-y-2 pr-1">
              <Label>Existing Categories</Label>
              {categories.length === 0 && <p className="text-sm text-muted-foreground">No categories yet.</p>}

              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between bg-muted/40 p-2 rounded-md border">
                  <span className="text-sm font-medium">{cat.name}</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer"
                    onClick={() => handleDeleteCategory(cat.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>

          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Form>
  )
}