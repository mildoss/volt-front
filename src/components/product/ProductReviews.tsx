import {Product} from "@/types/product";

export const ProductReviews = ({reviews, productId}: { reviews: Product['reviews'], productId: number }) => {

  if (reviews.length === 0) return (
    <div className="col-span-full text-center py-10 text-muted-foreground bg-muted/30 rounded-xl">
      No review yet.
    </div>
  )

  return (
    <div className="flex flex-col gap-8">

      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-2xl md:text-3xl font-bold">Reviews ({reviews.length})</h2>
        <button className="text-primary font-medium hover:underline text-sm cursor-pointer">Write a review</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-card border-border p-6 rounded-xl flex flex-col gap-4 shadow-sm hover:shadow-md transition-colors">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {review.user.email[0]}
              </div>
              <h3 className="font-bold text-sm text-foreground">{review.user.name || 'Anonymous'}</h3>
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