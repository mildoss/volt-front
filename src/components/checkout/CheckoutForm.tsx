'use client'

import {Cart} from "@/types/product";
import {z} from "zod";
import {useTransition} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {placeOrder} from "@/app/actions/order.actions";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Image from "next/image";

const formSchema = z.object({
  address: z.string().min(5, 'Address is too short'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  comment: z.string().optional()
})

type TypeCheckoutSchema = z.infer<typeof formSchema>;

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);


export const CheckoutForm = ({cart} : {cart: Cart}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<TypeCheckoutSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      phone: '',
      comment: ''
    }
  });

  const total = cart.items.reduce((acc,item) => acc + item.product.price * item.quantity,0);

  const onSubmit = (values: TypeCheckoutSchema) => {
    startTransition(async () => {
      const res = await placeOrder(values);

      if (res?.error) {
        alert(res.error);
      } else {
        router.push('/checkout/success');
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Shipping Details</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FormField
              control={form.control}
              name="address"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Delivery Address</FormLabel>
                  <FormControl>
                  <Input placeholder="City, Street, House..." {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+380 123 45 67" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Comment (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Entry code, floor, etc." {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg" className="w-full lg:hidden" disabled={isPending}>
              {isPending ? 'Processing...' : `Pay ${formatPrice(total)}`}
            </Button>
          </form>
        </Form>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-muted/30 p-6 rounded-xl border border-border sticky top-24">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>

          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto text-sm">
            {cart.items.map((item) => (
              <div key={item.id} className="flex gap-3 text-sm items-center">
                <div className="w-12 h-12 bg-transparent rounded overflow-hidden relative shrink-0 border">
                  {item.product.imageUrl &&
                    <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover"/>}
                </div>
                <div className="flex-1">
                  <p className="font-medium line-clamp-1">{item.product.name}</p>
                  <p className="text-muted-foreground">{item.quantity} x {formatPrice(item.product.price)}</p>
                </div>
                <div className="font-bold">
                  {formatPrice(item.product.price * item.quantity)}
                </div>
              </div>
              ))}
          </div>

          <div className="border-t border-border pt-4 flex justify-between items-center text-lg font-bold mb-6">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <Button
            size="lg"
            className="w-full hidden lg:flex cursor-pointer"
            disabled={isPending}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isPending ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      </div>
    </div>
  )
}