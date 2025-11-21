import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminFormWrapper } from "@/features/admin/components/ui/AdminFormWrapper";
import { PostForm } from "@/features/admin/features/posts/components/PostForm";
import { getPost } from "@/features/admin/features/posts/actions";
import { notFound } from "next/navigation";

interface EditPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params;
    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <AdminPageHeader heading="Edit Post" text="Edit post details" />
            <AdminFormWrapper title="Post Details">
                <PostForm initialData={post} />
            </AdminFormWrapper>
        </div>
    );
}
