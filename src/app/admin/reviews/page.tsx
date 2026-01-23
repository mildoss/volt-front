import {getAdminReviews} from "@/app/actions/review.actions";
import {AdminReviewList} from "@/components/admin/AdminReviewsList";
import {Pagination} from "@/components/ui/Pagination";


export default async function AdminReviewsPage({ searchParams }: { searchParams: Promise<string> }) {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();

  const data = await getAdminReviews(queryString);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reviews ({data.length})</h1>

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
          {data.items.map((review) => (
            <AdminReviewList key={review.id} review={review} />
          ))}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="p-10 text-center text-muted-foreground">
            No reviews found.
          </div>
        )}
      </div>

      <Pagination length={data.length} />
    </div>
  )
}