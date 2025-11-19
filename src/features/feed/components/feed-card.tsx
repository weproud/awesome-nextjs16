import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2 } from "lucide-react";

interface Post {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    author: {
        name: string | null;
        image: string | null;
    };
}

interface FeedCardProps {
    post: Post;
}

export function FeedCard({ post }: FeedCardProps) {
    return (
        <Card className="w-full hover:bg-muted/50 transition-colors">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
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
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <Link href={`/feed/${post.id}`} className="group">
                    <h3 className="text-lg font-semibold mb-2 group-hover:underline">
                        {post.title}
                    </h3>
                    <div
                        className="text-sm text-muted-foreground line-clamp-3 prose prose-sm dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </Link>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
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
            </CardFooter>
        </Card>
    );
}
