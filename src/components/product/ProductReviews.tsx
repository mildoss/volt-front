import {Product} from "@/types/product";
import {LeaveReviewModal} from "@/components/product/LeaveReviewModal";
import {UserAvatar} from "@/components/ui/user-avatar";

export const ProductReviews = ({reviews, productId, productSlug}: { reviews: Product['reviews'], productId: number, productSlug: string }) => {

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 bg-muted/30 rounded-xl">
        <p className="text-muted-foreground text-center">
          No reviews yet. Be the first to leave a review!
        </p>
        <LeaveReviewModal
          productId={productId}
          productSlug={productSlug}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">

      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-2xl md:text-3xl font-bold">Reviews ({reviews.length})</h2>
        <LeaveReviewModal productId={productId} productSlug={productSlug}/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-card border-border p-6 rounded-xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-colors">
            <div className="flex items-center gap-3">
              <UserAvatar user={review.user} size={40} />
              <h3 className="font-bold text-sm text-foreground">{review.user.fullName || 'Anonymous'}</h3>
              <div
                className="text-yellow-500 text-xs tracking-widest">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
              <span
                className="ml-auto text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-muted-foreground text-sm">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}