import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { DeletePostButton } from "./delete-post-button";

interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    authorId: string;
    author: {
        name: string | null;
        image: string | null;
    };
}

interface FeedDetailProps {
    post: Post;
}

export async function FeedDetail({ post }: FeedDetailProps) {
    const session = await auth();
    const isAuthor = session?.user?.id === post.authorId;

    return (
        <article className="max-w-3xl mx-auto">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={post.author.image || ""} alt={post.author.name || ""} />
                            <AvatarFallback>{post.author.name?.[0] || "U"}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-sm font-medium leading-none">{post.author.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                            </p>
                        </div>
                    </div>
                    {isAuthor && (
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/feed/${post.id}/edit`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Link>
                            </Button>
                            <DeletePostButton postId={post.id} />
                        </div>
                    )}
                </div>
            </header>
            <div
                className="prose prose-lg dark:prose-invert max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="flex items-center gap-4 border-t pt-4">
                <Button variant="ghost" size="sm" className="gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Like</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                </Button>
            </div>
        </article>
    );
}
