import { SignInView } from "@/features/auth/components/sign-in-view";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <SignInView />
        </div>
    );
}
