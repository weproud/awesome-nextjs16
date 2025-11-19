"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    contentHtml: z.string().min(1, "Content HTML is required"),
});

export async function getPosts({
    page = 1,
    limit = 10,
}: { page?: number; limit?: number } = {}) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
        prisma.post.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
            },
        }),
        prisma.post.count(),
    ]);

    return {
        posts,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
    };
}

export async function getPost(id: string) {
    const post = await prisma.post.findUnique({
        where: { id },
        include: {
            author: {
                select: {
                    name: true,
                    image: true,
                },
            },
        },
    });

    return post;
}

export async function createPost(data: z.infer<typeof postSchema>) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const validatedData = postSchema.parse(data);

    const post = await prisma.post.create({
        data: {
            ...validatedData,
            authorId: session.user.id,
        },
    });

    revalidatePath("/feed");
    return post;
}

export async function updatePost(id: string, data: z.infer<typeof postSchema>) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        throw new Error("Post not found");
    }

    if (post.authorId !== session.user.id) {
        throw new Error("Unauthorized");
    }

    const validatedData = postSchema.parse(data);

    const updatedPost = await prisma.post.update({
        where: { id },
        data: validatedData,
    });

    revalidatePath("/feed");
    revalidatePath(`/feed/${id}`);
    return updatedPost;
}

export async function deletePost(id: string) {
    const session = await auth();
    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) {
        throw new Error("Post not found");
    }

    if (post.authorId !== session.user.id) {
        throw new Error("Unauthorized");
    }

    await prisma.post.delete({
        where: { id },
    });

    revalidatePath("/feed");
}
