import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { PostList } from "@/features/admin/features/posts/components/PostList";
import { getPosts } from "@/features/admin/features/posts/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminPostsPage() {
    const posts = await getPosts();

    // Transform data to match PostColumn type if necessary, 
    // but getPosts returns compatible structure (author included).

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <AdminPageHeader heading="Posts" text="Manage your blog posts">
                <Link href="/admin/posts/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </Link>
            </AdminPageHeader>
            <PostList data={posts} />
        </div>
    );
}
