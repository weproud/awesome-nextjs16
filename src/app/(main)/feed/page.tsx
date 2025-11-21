import { FeedList } from "@/features/feed/components/feed-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function FeedPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Feed</h1>
                <Button asChild>
                    <Link href="/feed/new">
                        <Plus className="h-4 w-4 mr-2" />
                        New Post
                    </Link>
                </Button>
            </div>
            <FeedList />
        </div>
    );
}
