'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { getCategories } from "@/app/actions/category.actions";
import { Button } from "@/components/ui/button";

export const ProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set('page', '1');

    router.replace(`/?${params.toString()}`);
  }

  const resetFilters = () => {
    router.push('/');
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
  }

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && updateUrl('searchTerm', searchTerm)}
            onBlur={() => updateUrl('searchTerm', searchTerm)}
            className="w-full pl-10"
          />
        </div>

        <div className="w-full sm:w-50">
          <Select
            value={searchParams.get('sort') || 'newest'}
            onValueChange={(value) => updateUrl('sort', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="high-price">Price: High to Low</SelectItem>
              <SelectItem value="low-price">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">

        <div className="w-full sm:w-50">
          <Select
            value={searchParams.get('categoryId') || 'all'}
            onValueChange={(value) => updateUrl('categoryId', value === 'all' ? '' : value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Input
            placeholder="Min Price"
            type="number"
            className="w-24 md:w-32"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            onBlur={() => updateUrl('minPrice', minPrice)}
            onKeyDown={(e) => e.key === 'Enter' && updateUrl('minPrice', minPrice)}
          />
          <span className="text-muted-foreground">-</span>
          <Input
            placeholder="Max Price"
            type="number"
            className="w-24 md:w-32"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            onBlur={() => updateUrl('maxPrice', maxPrice)}
            onKeyDown={(e) => e.key === 'Enter' && updateUrl('maxPrice', maxPrice)}
          />
        </div>

        {hasFilters && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="ml-auto text-muted-foreground hover:text-destructive cursor-pointer"
          >
            <X size={16} className="mr-2" />
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}