'use client'

import {Button} from "@/components/ui/button";
import {useTransition} from "react";
import {useRouter} from "next/navigation";
import {addToCart} from "@/app/actions/cart.action";

type Props = {
  productId: number;
  isAvailable: boolean;
  isLoggedIn: boolean;
}

export const AddToCartButton = ({productId, isAvailable, isLoggedIn}: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onClick = () => {
    if (!isLoggedIn) {
      router.push('/auth');
      return;
    }

    startTransition(async () => {
      const res = await addToCart(productId, 1);

      if (res?.error) {
        alert(res.error);
      }
    })
  }

  return (
    <Button
      onClick={onClick}
      disabled={!isAvailable || isPending}
      className={`flex-1 font-medium h-auto py-4 px-6 rounded-lg text-base
      transition-all duration-300 shadow-lg transform cursor-pointer
      ${isAvailable
        ? 'bg-primary text-primary-foreground hover:bg-blue-600 shadow-blue-500/20 active:scale-95'
        : 'bg-muted text-muted-foreground cursor-not-allowed shadow-none hover:bg-muted'
      }`}
    >
      {isPending ? 'Adding...' : (isAvailable ? 'Add to cart' : 'Out of stock')}
    </Button>
  )
}