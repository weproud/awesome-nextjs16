import { notFound } from "next/navigation";
import { FeedForm } from "@/features/feed/components/feed-form";
import { getPost } from "@/features/feed/actions/feed-actions";
import { auth } from "@/auth";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [post, session] = await Promise.all([getPost(id), auth()]);

    if (!post) {
        notFound();
    }

    if (post.authorId !== session?.user?.id) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1 className="text-2xl font-bold text-destructive">Unauthorized</h1>
                <p className="text-muted-foreground">You can only edit your own posts.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Edit Post</h1>
            <FeedForm initialData={post} />
        </div>
    );
}
