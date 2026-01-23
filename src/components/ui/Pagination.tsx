'use client'

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  length: number;
  perPage?: number;
}

export const Pagination = ({ length, perPage = 20 }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const page = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(length / perPage);

  const updatePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10">
      <Button
        variant="outline"
        size="icon"
        disabled={page === 1}
        onClick={() => updatePage(page - 1)}
      >
        <ChevronLeft size={16} />
      </Button>

      <span className="text-sm font-medium mx-2">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        disabled={page === totalPages}
        onClick={() => updatePage(page + 1)}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  )
}