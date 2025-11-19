import { Modal } from "@/features/auth/components/modal";
import { SignInView } from "@/features/auth/components/sign-in-view";

export default function InterceptedLoginPage() {
    return (
        <Modal>
            <SignInView />
        </Modal>
    );
}
