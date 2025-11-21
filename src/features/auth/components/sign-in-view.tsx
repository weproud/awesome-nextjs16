import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SignInView() {
    return (
        <div className="grid gap-6">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
                <p className="text-sm text-muted-foreground">
                    Sign in to your account to access all features.
                </p>
            </div>
            <form
                action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/" });
                }}
            >
                <Button type="submit" className="w-full">
                    Sign in with Google
                </Button>
            </form>
        </div>
    );
}
