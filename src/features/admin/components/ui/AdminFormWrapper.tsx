interface AdminFormWrapperProps {
    children: React.ReactNode;
    title: string;
    description?: string;
}

export function AdminFormWrapper({
    children,
    title,
    description,
}: AdminFormWrapperProps) {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">{title}</h3>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </div>
            <div className="p-6 border rounded-lg bg-card">{children}</div>
        </div>
    );
}
