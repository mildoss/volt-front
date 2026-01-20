import {getAdminReviews} from "@/app/actions/review.action";
import {AdminReviewList} from "@/components/admin/AdminReviewsList";
import {Review} from "@/types/product";


export default async function AdminReviewsPage() {
  const reviews = await getAdminReviews() as Review[];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reviews ({reviews.length})</h1>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Product</th>
            <th className="px-6 py-4">Rating</th>
            <th className="px-6 py-4">Comment</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-border">
          {reviews.map((review: any) => (
            <AdminReviewList key={review.id} review={review} />
          ))}
          </tbody>
        </table>

        {reviews.length === 0 && (
          <div className="p-10 text-center text-muted-foreground">
            No reviews found.
          </div>
        )}
      </div>
    </div>
  )
}