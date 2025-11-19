import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2 } from "lucide-react";

import { Post } from "../types";

interface FeedCardProps {
    post: Post;
}

export function FeedCard({ post }: FeedCardProps) {
    return (
        <Card className="w-full hover:bg-muted/50 transition-colors border-border/40 shadow-sm p-2">
            <CardHeader className="flex flex-row items-start gap-3 p-2">
                <Avatar className="h-10 w-10 border">
                    <AvatarImage src={post.author.image || ""} alt={post.author.name || ""} />
                    <AvatarFallback>{post.author.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold leading-none">{post.author.name}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                    <Link href={`/feed/${post.id}`} className="group block">
                        <h3 className="text-base font-medium group-hover:text-primary transition-colors mb-1">
                            {post.title}
                        </h3>
                        <div
                            className="text-sm text-muted-foreground line-clamp-2 prose prose-sm dark:prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                        />
                    </Link>
                </div>
            </CardHeader>
            <CardFooter className="p-1 flex justify-start items-center gap-4 border-t bg-muted/20">
                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground gap-1.5">
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">Like</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs">Comment</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground hover:text-foreground gap-1.5">
                    <Share2 className="h-4 w-4" />
                    <span className="text-xs">Share</span>
                </Button>
            </CardFooter>
        </Card>
    );
}
