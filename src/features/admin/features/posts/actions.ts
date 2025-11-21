"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { postSchema } from "./schemas";
import { z } from "zod";

const ADMIN_PAGE_PATH = "/admin/posts";

async function checkAdmin() {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }
    return session.user;
}

export async function getPosts() {
    await checkAdmin();
    return prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true, email: true } } },
    });
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
