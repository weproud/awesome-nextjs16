"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostFormValues } from "../schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TiptapEditor } from "@/features/feed/components/tiptap-editor";
import { createPost, updatePost } from "../actions";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface PostFormProps {
    initialData?: PostFormValues & { id: string };
}

export function PostForm({ initialData }: PostFormProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: initialData || {
            title: "",
            content: "",
            contentHtml: "",
        },
    });

    const onSubmit = (values: PostFormValues) => {
        startTransition(async () => {
            if (initialData) {
                await updatePost(initialData.id, values);
            } else {
                await createPost(values);
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Post title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <TiptapEditor
                                    content={field.value}
                                    onChange={({ html, text }) => {
                                        form.setValue("content", text);
                                        form.setValue("contentHtml", html);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isPending}>
                    {initialData ? "Update Post" : "Create Post"}
                </Button>
            </form>
        </Form>
    );
}
