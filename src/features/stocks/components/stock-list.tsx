import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function StockList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Apple Inc. (AAPL)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$150.00</p>
          <p className="text-sm text-green-500">+1.2%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Microsoft Corp. (MSFT)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$300.00</p>
          <p className="text-sm text-red-500">-0.5%</p>
        </CardContent>
      </Card>
    </div>
  );
}
