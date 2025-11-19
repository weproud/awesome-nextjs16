export interface Post {
    id: string;
    title: string;
    content: string;
    contentHtml: string;
    createdAt: Date;
    author: {
        name: string | null;
        image: string | null;
    };
}
