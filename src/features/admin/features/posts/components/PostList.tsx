"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AdminDataTable } from "@/features/admin/components/ui/AdminDataTable";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { deletePost } from "../actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { createColumns, createIdColumn, ColumnMetadata } from "@/features/admin/lib/column-builder";

export type PostColumn = {
    id: string;
    title: string;
    content: string | null;
    author: {
        name: string | null;
        email: string | null;
    };
    createdAt: Date;
    updatedAt: Date;
};

const postColumnMetadata: ColumnMetadata<PostColumn>[] = [
    {
        accessorKey: "title",
        header: "제목",
        type: "text",
    },
    {
        accessorKey: "content",
        header: "내용",
        type: "truncate",
        maxWidth: 300,
    },
    {
        accessorKey: "author.name",
        header: "작성자",
        cell: (_, row) => row.author.name || "Unknown",
    },
    {
        accessorKey: "createdAt",
        header: "생성일",
        type: "date",
    },
    {
        accessorKey: "updatedAt",
        header: "수정일",
        type: "date",
    },
];

function createActionsColumn(): ColumnDef<PostColumn> {
    return {
        id: "actions",
        cell: ({ row }) => {
            const post = row.original;
            const router = useRouter();
            const [isPending, startTransition] = useTransition();

            const onDelete = () => {
                if (confirm("정말 삭제하시겠습니까?")) {
                    startTransition(async () => {
                        await deletePost(post.id);
                        router.refresh();
                    });
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">메뉴 열기</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>작업</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/posts/${post.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                수정
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            삭제
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    };
}

const columns: ColumnDef<PostColumn>[] = [
    createIdColumn<PostColumn>(),
    ...createColumns(postColumnMetadata),
    createActionsColumn(),
];

interface PostListProps {
    data: PostColumn[];
    totalCount: number;
}

export function PostList({ data, totalCount }: PostListProps) {
    return (
        <AdminDataTable
            columns={columns}
            data={data}
            totalCount={totalCount}
        />
    );
}
