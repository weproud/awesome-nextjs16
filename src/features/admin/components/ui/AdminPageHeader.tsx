import { cn } from "@/lib/utils";

interface AdminPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    heading: string;
    children?: React.ReactNode;
}

export function AdminPageHeader({
    heading,
    children,
    className,
    ...props
}: AdminPageHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between px-2", className)} {...props}>
            <div className="grid gap-1">
                <h1 className="font-black text-2xl md:text-3xl">{heading}</h1>
            </div>
            {children}
        </div>
    );
}
