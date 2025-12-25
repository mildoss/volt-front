'use client'

import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {toggleFavorite} from "@/app/actions/user.action";

type Props = {
  productId: number;
  productSlug: string;
  isFavorite: boolean;
  isLoggedIn: boolean;
}

export const FavoriteButton = ({productId, productSlug, isFavorite, isLoggedIn }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isLiked, setIsLiked] = useState(isFavorite);
  const router = useRouter();

  const onClick = () => {
    if (!isLoggedIn) {
      router.push('/auth');
      return;
    }

    const newState = !isLiked;
    setIsLiked(newState);

    startTransition(async () => {
      const res = await toggleFavorite(productId, productSlug);

      if (res?.error) setIsLiked(!newState);
    })
  };

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={`px-6 h-full transition-colors cursor-pointer ${isLiked ? "text-red-500 border-red-200 bg-red-50 hover:bg-red-100" : ""}`}
      disabled={isPending}
    >
      {isLiked ? "♥" : "♡"}
    </Button>
  )
}