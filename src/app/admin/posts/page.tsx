import { AdminPageHeader } from "@/features/admin/components/ui/AdminPageHeader";
import { PostList } from "@/features/admin/features/posts/components/PostList";
import { getPostsWithFilter } from "@/features/admin/features/posts/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminTableFilter, FilterField } from "@/features/admin/components/ui/AdminTableFilter";
import { postFilterSchema } from "@/features/admin/features/posts/schemas/post-filter-schema";
import { parseSearchParams } from "@/features/admin/lib/filter-schema";

const filterFields: FilterField[] = [
    {
        name: "title",
        label: "제목",
        type: "text",
        placeholder: "제목 검색...",
    },
    {
        name: "content",
        label: "내용",
        type: "text",
        placeholder: "내용 검색...",
    },
    {
        name: "authorName",
        label: "작성자",
        type: "text",
        placeholder: "작성자 검색...",
    },
    {
        name: "createdFrom",
        label: "생성일 (시작)",
        type: "date",
    },
    {
        name: "createdTo",
        label: "생성일 (종료)",
        type: "date",
    },
];

interface AdminPostsPageProps {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminPostsPage({ searchParams }: AdminPostsPageProps) {
    const params = await searchParams;
    const filter = parseSearchParams(params, postFilterSchema);
    const { posts, totalCount } = await getPostsWithFilter(filter);

    return (
        <div className="flex-1 space-y-4">
            <AdminPageHeader heading="게시물 관리">
                <Link href="/admin/posts/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        새 게시물
                    </Button>
                </Link>
            </AdminPageHeader>

            <AdminTableFilter
                fields={filterFields}
                basePath="/admin/posts"
            />

            <PostList data={posts} totalCount={totalCount} />
        </div>
    );
}
