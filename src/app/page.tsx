import { Header } from "@/components/common/header";
import { StockList } from "@/features/stocks/components/stock-list";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Market Overview</h1>
        <StockList />
      </main>
    </div>
  );
}
