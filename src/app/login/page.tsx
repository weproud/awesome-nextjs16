import { SignInView } from "@/features/auth/components/sign-in-view";
import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <Card className="w-full max-w-md mx-auto">
                <CardContent className="pt-6">
                    <SignInView />
                </CardContent>
            </Card>
        </div>
    );
}
