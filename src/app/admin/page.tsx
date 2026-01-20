import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users } from "lucide-react";
import {getStatistics} from "@/app/actions/admin.actions";
import {formatPrice} from "@/lib/utils";
import {StatisticItem} from "@/types/product";

export default async function AdminDashboardPage() {
  const stats = await getStatistics() as StatisticItem[];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.name}
              </CardTitle>
              {stat.name === 'Total Revenue' && <DollarSign className="text-primary h-4 w-4" />}
              {stat.name === 'Orders' && <ShoppingBag className="text-primary h-4 w-4" />}
              {stat.name === 'Users' && <Users className="text-primary h-4 w-4" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.isMoney ? formatPrice(stat.value) : stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Total for all time
              </p>
            </CardContent>
          </Card>
        ))}

        {stats.length === 0 && (
          <p className="text-muted-foreground">Loading statistics...</p>
        )}
      </div>
    </div>
  )
}