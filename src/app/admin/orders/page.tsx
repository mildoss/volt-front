import {getAdminOrders} from "@/app/actions/order.actions";
import {AdminOrderList} from "@/components/admin/AdminOrderList";
import {Property} from "csstype";
import Order = Property.Order;

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders() as Order[];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Orders ({orders.length})</h1>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs font-semibold">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Items</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Date</th>
          </tr>
          </thead>
          <tbody className="divide-y divide-border">
          {orders.map((order: any) => (
            <AdminOrderList key={order.id} order={order} />
          ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-10 text-center text-muted-foreground">
            No orders found.
          </div>
        )}
      </div>
    </div>
  )
}