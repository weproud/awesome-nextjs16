"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TiptapEditor } from "./tiptap-editor";
import { createPost, updatePost } from "../actions/feed-actions";
import { Loader2 } from "lucide-react";

interface FeedFormProps {
    initialData?: {
        id: string;
        title: string;
        content: string;
    };
}

export function FeedForm({ initialData }: FeedFormProps) {
    const router = useRouter();
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        setIsLoading(true);
        try {
            if (initialData) {
                await updatePost(initialData.id, { title, content });
                router.push(`/feed/${initialData.id}`);
            } else {
                await createPost({ title, content });
                router.push("/feed");
            }
            router.refresh();
        } catch (error) {
            console.error("Failed to save post:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
            <div className="space-y-2">
                <Input
                    placeholder="Post Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-2xl font-bold h-auto py-3"
                    disabled={isLoading}
                />
            </div>
            <div className="space-y-2">
                <TiptapEditor content={content} onChange={setContent} editable={!isLoading} />
            </div>
            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading || !title.trim() || !content.trim()}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Update Post" : "Create Post"}
                </Button>
            </div>
        </form>
    );
}
