'use client'

import {Cart} from "@/types/product";
import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Minus, Plus, ShoppingCart, Trash2} from "lucide-react";
import {DialogDescription} from "@/components/ui/dialog";
import Link from "next/link";
import Image from "next/image";
import {useTransition} from "react";
import {removeFromCart, updateQuantity} from "@/app/actions/cart.actions";
import {formatPrice} from "@/lib/utils";

export const CartSheet = ({cart}: { cart: Cart | null }) => {
  const [isPending, startTransition] = useTransition();

  const total = cart?.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0) || 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative cursor-pointer">
          <ShoppingCart size={24}/>
          {cart && cart.items.length > 0 && (
            <span
              className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cart.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col p-4">
        <SheetHeader>
          <SheetTitle>My Cart ({cart?.items.length || 0})</SheetTitle>
          <DialogDescription className="sr-only">List of products in your cart</DialogDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {!cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
              <ShoppingCart size={48} className="opacity-20"/>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                    {item.product.imageUrl ? (
                      <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover"/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs">No photo</div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 justify-between">
                    <div>
                      <h4 className="font-bold text-sm line-clamp-2">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 bg-muted rounded-md px-1">
                        <button
                          disabled={isPending || item.quantity <= 1}
                          onClick={() => startTransition(async () => {
                            await updateQuantity(item.id, 'minus')
                          })}
                          className="p-1 hover:text-primary disabled:opacity-50 cursor-pointer"
                        >
                          <Minus size={14}/>
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button
                          disabled={isPending || item.quantity >= item.product.stock}
                          onClick={() => startTransition(async () => {
                            await updateQuantity(item.id, 'plus')
                          })}
                          className="p-1 hover:text-primary disabled:opacity-50 cursor-pointer"
                        >
                          <Plus size={14}/>
                        </button>
                      </div>

                      <button
                        disabled={isPending}
                        onClick={() => startTransition(async () => {
                          await removeFromCart(item.id)
                        })}
                        className="text-muted-foreground hover:text-destructive transition-colors ml-auto cursor-pointer"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <SheetFooter>
          {cart && cart.items.length > 0 && (
            <div className="pt-4 border-t border-border space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Link href="/checkout" className="w-full block">
                <Button className="w-full h-12 text-base cursor-pointer">Checkout</Button>
              </Link>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}