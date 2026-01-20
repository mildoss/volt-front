'use client'

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {deleteReview} from "@/app/actions/review.action";
import { toast } from "sonner";
import { useTransition } from "react";
import Image from "next/image";
import {Review} from "@/types/product";

export const AdminReviewList = ({ review }: { review: Review }) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    startTransition(async () => {
      const res = await deleteReview(review.id);
      if (res?.error) toast.error(res.error);
      else toast.success('Review deleted');
    });
  };

  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="px-6 py-4 font-medium">#{review.id}</td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="relative w-6 h-6 rounded-full overflow-hidden bg-muted">
            {review.user.avatarUrl ? (
              <Image src={review.user.avatarUrl} alt="" fill className="object-cover" />
            ) : (
              <span className="flex items-center justify-center h-full text-[10px] font-bold">
                    {review.user.fullName?.[0] || 'U'}
                </span>
            )}
          </div>
          <span className="text-xs font-bold">{review.user.fullName || 'Guest'}</span>
        </div>
      </td>

      <td className="px-6 py-4 text-xs">
        {review.product.name}
      </td>

      <td className="px-6 py-4 text-yellow-500 font-bold">
        {'★'.repeat(review.rating)}
      </td>

      <td className="px-6 py-4 max-w-xs truncate text-muted-foreground" title={review.text}>
        {review.text}
      </td>

      <td className="px-6 py-4 text-xs text-muted-foreground">
        {new Date(review.createdAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4 text-right">
        <Button
          variant="destructive"
          size="icon-sm"
          onClick={handleDelete}
          disabled={isPending}
          className="cursor-pointer"
        >
          <Trash2 size={16} />
        </Button>
      </td>
    </tr>
  )
}