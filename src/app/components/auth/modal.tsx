"use client";

import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    function onDismiss() {
        router.back();
    }

    return (
        <Dialog open={true} onOpenChange={(open) => !open && onDismiss()}>
            <DialogContent className="sm:max-w-[425px]">
                <VisuallyHidden>
                    <DialogTitle>Sign In</DialogTitle>
                </VisuallyHidden>
                {children}
            </DialogContent>
        </Dialog>
    );
}
