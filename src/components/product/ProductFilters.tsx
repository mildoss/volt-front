'use client'

import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Search} from "lucide-react";

export const ProductFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerm') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18}/>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') updateUrl('searchTerm', searchTerm);
            }}
            onBlur={() => updateUrl('searchTerm', searchTerm)}
            className="w-full pl-10"
          />
        </div>

      <div className="w-full sm:w-[200px] sm:ml-auto">
        <Select
          value={sort}
          onValueChange={(value) => {
            setSort(value)
            updateUrl('sort', value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by"/>
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
  )
}