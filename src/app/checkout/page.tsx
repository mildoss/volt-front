import {CheckoutForm} from "@/components/checkout/CheckoutForm";
import {getCart} from "@/app/actions/cart.action";
import {redirect} from "next/navigation";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Checkout | Volt Shop",
};

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    redirect('/');
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <CheckoutForm cart={cart} />
    </div>
  )
}