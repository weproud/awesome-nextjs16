import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function SignInView() {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Sign in to your account to access all features.
                </CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
        </Card>
    );
}
