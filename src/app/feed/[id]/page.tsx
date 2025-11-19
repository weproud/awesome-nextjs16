import { notFound } from "next/navigation";
import { FeedDetail } from "@/features/feed/components/feed-detail";
import { getPost } from "@/features/feed/actions/feed-actions";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <FeedDetail post={post} />
        </div>
    );
}
