import { getPosts } from "@/features/feed/actions/feed-actions";
import { FeedCard } from "@/features/feed/components/feed-card";
import { Post } from "@/features/feed/types";

export async function FeedList() {
    const { posts } = await getPosts();

    return (
        <div className="flex flex-col gap-4">
            {posts.map((post: Post) => (
                <FeedCard key={post.id} post={post} />
            ))}
            {posts.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                    No posts yet. Be the first to create one!
                </div>
            )}
        </div>
    );
}
