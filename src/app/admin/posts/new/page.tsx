import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { AdminFormWrapper } from "@/features/admin/components/ui/AdminFormWrapper";
import { PostForm } from "@/features/admin/features/posts/components/PostForm";

export default function NewPostPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <AdminPageHeader heading="새 게시물 작성" />
            <AdminFormWrapper title="Post Details">
                <PostForm />
            </AdminFormWrapper>
        </div>
    );
}
