import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect("/api/auth/signin");
    }

    if (session.user.role !== "ADMIN") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
                <p className="text-muted-foreground">You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between p-2">
                    <div className="font-bold text-lg">Admin Console</div>
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[240px_1fr] py-8">
                <aside className="hidden w-[240px] flex-col md:flex border-r pr-6">
                    <nav className="grid items-start gap-2">
                        <a href="/admin" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                            Dashboard
                        </a>
                        <a href="/admin/posts" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                            Posts
                        </a>
                        <a href="/admin/users" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                            Users
                        </a>
                        <a href="/admin/settings" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
                            Settings
                        </a>
                    </nav>
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
