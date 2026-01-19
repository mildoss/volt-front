'use client'

import {formatPrice} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {updateOrderStatus} from "@/app/actions/order.actions";
import {toast} from "sonner";
import {useTransition} from "react";
import Image from "next/image";
import {Order, OrderStatus} from "@/types/product";

const STATUSES = ['PENDING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export const AdminOrderList = ({order}: { order: Order }) => {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (value: OrderStatus) => {
    startTransition(async () => {
      const res = await updateOrderStatus(order.id, value);
      if (res?.error) toast.error(res.error);
      else toast.success(`Order #${order.id} status updated to ${value}`);
    });
  };

  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="px-6 py-4 font-medium">#{order.id}</td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          <span className="font-bold">{order.user.fullName || 'Guest'}</span>
          <span className="text-xs text-muted-foreground">{order.user.email}</span>
          <span className="text-xs text-muted-foreground">{order.user.phone}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-2">
          {order.items.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded bg-muted overflow-hidden border">
                {item.product.imageUrl &&
                  <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover"/>
                }
              </div>
              <span className="text-xs">
                {item.product.name} <span className="font-bold">| x{item.quantity}</span>
              </span>
            </div>
          ))}
        </div>
      </td>

      <td className="px-6 py-4 font-bold">{formatPrice(order.total)}</td>

      <td className="px-6 py-4">
        <Select
          defaultValue={order.status}
          onValueChange={handleStatusChange}
          disabled={isPending}
        >
          <SelectTrigger className={`w-[130px] h-8 text-xs font-bold
                        ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
            order.status === 'DELIVERED' ? 'bg-green-100 text-green-700 border-green-200' :
              order.status === 'CANCELLED' ? 'bg-red-100 text-red-700 border-red-200' : ''}
                    `}>
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            {STATUSES.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </td>

      <td className="px-6 py-4 text-muted-foreground text-xs">
        {new Date(order.createdAt).toLocaleDateString()}
      </td>
    </tr>
  )
}