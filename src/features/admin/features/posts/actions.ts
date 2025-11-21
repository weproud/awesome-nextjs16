"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postSchema } from "./schemas";
import { z } from "zod";
import { PostFilter } from "./schemas/post-filter-schema";
import { Prisma } from "@prisma/client";

const ADMIN_PAGE_PATH = "/admin/posts";

async function checkAdmin() {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    return session.user;
}

export async function getPostsWithFilter(filter: Partial<PostFilter>) {
    await checkAdmin();

    const where: Prisma.PostWhereInput = {};

    if (filter.title) {
        where.title = { contains: filter.title };
    }

    if (filter.content) {
        where.content = { contains: filter.content };
    }

    if (filter.authorName) {
        where.author = {
            name: { contains: filter.authorName },
        };
    }

    if (filter.createdFrom || filter.createdTo) {
        where.createdAt = {};
        if (filter.createdFrom) {
            where.createdAt.gte = new Date(filter.createdFrom);
        }
        if (filter.createdTo) {
            where.createdAt.lte = new Date(filter.createdTo);
        }
    }

    const orderBy: Prisma.PostOrderByWithRelationInput = {};
    if (filter.sortBy) {
        orderBy[filter.sortBy as keyof Prisma.PostOrderByWithRelationInput] =
            filter.sortOrder || "desc";
    } else {
        orderBy.createdAt = "desc";
    }

    const page = filter.page || 1;
    const pageSize = filter.pageSize || 10;
    const skip = (page - 1) * pageSize;

    const [posts, totalCount] = await Promise.all([
        prisma.post.findMany({
            where,
            orderBy,
            skip,
            take: pageSize,
            include: { author: { select: { name: true, email: true } } },
        }),
        prisma.post.count({ where }),
    ]);

    return { posts, totalCount, page, pageSize };
}

export async function getPost(id: string) {
    await checkAdmin();
    return prisma.post.findUnique({
        where: { id },
    });
}

export async function createPost(values: z.infer<typeof postSchema>) {
    const user = await checkAdmin();
    const validated = postSchema.parse(values);

    await prisma.post.create({
        data: {
            ...validated,
            authorId: user.id!,
        },
    });

    revalidatePath(ADMIN_PAGE_PATH);
    redirect(ADMIN_PAGE_PATH);
}

export async function updatePost(id: string, values: z.infer<typeof postSchema>) {
    await checkAdmin();
    const validated = postSchema.parse(values);

    await prisma.post.update({
        where: { id },
        data: validated,
    });

    revalidatePath(ADMIN_PAGE_PATH);
    redirect(ADMIN_PAGE_PATH);
}

export async function deletePost(id: string) {
    await checkAdmin();
    await prisma.post.delete({
        where: { id },
    });

    revalidatePath(ADMIN_PAGE_PATH);
}
