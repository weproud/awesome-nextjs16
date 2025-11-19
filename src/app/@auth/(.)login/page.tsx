import { Modal } from "@/app/components/auth/modal";
import { SignInView } from "@/features/auth/components/sign-in-view";

export default function InterceptedLoginPage() {
    return (
        <Modal>
            <SignInView />
        </Modal>
    );
}
