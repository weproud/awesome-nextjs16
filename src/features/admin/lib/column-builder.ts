import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import React from "react";

export type CellRenderer<T> = (value: any, row: T) => React.ReactNode;

export interface ColumnMetadata<T> {
    accessorKey: string;
    header: string;
    type?: "text" | "date" | "boolean" | "truncate" | "badge" | "custom";
    maxWidth?: number;
    cell?: CellRenderer<T>;
    enableSorting?: boolean;
    enableHiding?: boolean;
}

const defaultCellRenderers = {
    text: (value: any) => value?.toString() || "-",

    date: (value: any) => {
        if (!value) return "-";
        const date = value instanceof Date ? value : new Date(value);
        return format(date, "PPP", { locale: ko });
    },

    boolean: (value: any) => {
        if (value === null || value === undefined) return "-";
        return value ? "예" : "아니오";
    },

    truncate: (value: any, maxWidth = 300) => {
        const text = value?.toString() || "";
        return React.createElement(
            "span",
            {
                className: "block truncate",
                style: { maxWidth: `${maxWidth}px` },
                title: text,
            },
            text
        );
    },

    badge: (value: any) => {
        if (!value) return "-";
        return React.createElement(
            "span",
            {
                className: "inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary",
            },
            value
        );
    },
};

export function createColumns<T>(
    metadata: ColumnMetadata<T>[]
): ColumnDef<T>[] {
    return metadata.map((meta) => {
        const column: ColumnDef<T> = {
            accessorKey: meta.accessorKey,
            header: meta.header,
            enableSorting: meta.enableSorting ?? true,
            enableHiding: meta.enableHiding ?? true,
        };

        if (meta.cell) {
            column.cell = ({ row }) => meta.cell!(row.original[meta.accessorKey as keyof T], row.original);
        } else if (meta.type && meta.type !== "custom") {
            const renderer = defaultCellRenderers[meta.type];
            column.cell = ({ row }) => {
                const value = row.original[meta.accessorKey as keyof T];
                if (meta.type === "truncate") {
                    return renderer(value, meta.maxWidth);
                }
                return renderer(value);
            };
        }

        return column;
    });
}

export function createIdColumn<T extends { id: string }>(): ColumnDef<T> {
    return {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) =>
            React.createElement(
                "span",
                { className: "font-mono text-xs" },
                `${row.original.id.slice(0, 8)}...`
            ),
        enableSorting: false,
    };
}
