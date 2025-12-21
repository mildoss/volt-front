'use client'

import {useState} from "react";
import {leaveReview} from "@/app/actions/review.action";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

type Props = {
  productId: number;
  productSlug: string;
}

export const LeaveReviewModal = ({productId, productSlug}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    formData.append('rating', rating.toString());

    const res = await leaveReview(productId, productSlug, formData);

    if (res.error) {
      setError(res.error);
    } else {
      setIsOpen(false);
      setRating(5);
      setError('');
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-primary font-medium hover:underline text-sm cursor-pointer">
          Write a review
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[85v] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Leave a review</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-colors cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="text">Comment</Label>
              <Textarea
                id="text"
                name="text"
                placeholder="Tell us what you think..."
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button className="cursor-pointer" type="submit">Send Review</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}