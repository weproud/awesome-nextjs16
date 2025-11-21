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

export type PostColumn = {
    id: string;
    title: string;
    author: {
        name: string | null;
        email: string | null;
    };
    createdAt: Date;
};

export const columns: ColumnDef<PostColumn>[] = [
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "author.name",
        header: "Author",
        cell: ({ row }) => row.original.author.name || "Unknown",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const post = row.original;
            const router = useRouter();
            const [isPending, startTransition] = useTransition();

            const onDelete = () => {
                if (confirm("Are you sure you want to delete this post?")) {
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
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/admin/posts/${post.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={onDelete} className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

interface PostListProps {
    data: PostColumn[];
}

export function PostList({ data }: PostListProps) {
    return <AdminDataTable columns={columns} data={data} searchKey="title" />;
}
