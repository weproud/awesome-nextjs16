import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/common/mode-toggle";
import Link from "next/link";
import { auth } from "@/auth";
import { UserMenu } from "@/features/auth/components/user-menu";

export async function Header() {
  const session = await auth();
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          MadeInStock
        </Link>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm font-medium hover:underline"
            >
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            {session?.user ? (
              <UserMenu user={session.user} />
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
