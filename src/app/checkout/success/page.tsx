import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Order Success | Volt Shop",
};

export default function SuccessPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-muted/30 px-4 py-20">
      <Card className="w-full max-w-md text-center py-10 shadow-lg border-border/60">
        <CardContent className="flex flex-col items-center gap-6">

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
            <CheckCircle2 size={48} className="text-green-600" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Thank you!</h1>
            <p className="text-muted-foreground text-lg">
              Your order has been placed successfully.
            </p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              We will contact you shortly to confirm the details. You can track the status in your profile.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs mt-4">
            <Link href="/profile" className="w-full">
              <Button className="w-full cursor-pointer" size="lg">
                View My Orders
              </Button>
            </Link>

            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full cursor-pointer" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}