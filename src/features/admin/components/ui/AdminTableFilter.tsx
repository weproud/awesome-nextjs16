"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Search, X } from "lucide-react";
import { buildQueryString } from "@/features/admin/lib/filter-schema";

export interface FilterField {
    name: string;
    label: string;
    type: "text" | "date" | "select";
    placeholder?: string;
    options?: { label: string; value: string }[];
}

interface AdminTableFilterProps {
    fields: FilterField[];
    basePath: string;
}

export function AdminTableFilter({
    fields,
    basePath,
}: AdminTableFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentParams = Object.fromEntries(searchParams.entries());

    // undefined 값을 빈 문자열로 변환하여 controlled input 유지
    const defaultValues = Object.fromEntries(
        fields.map((field) => [field.name, currentParams[field.name] || ""])
    );

    const form = useForm({
        defaultValues,
    });

    const onSubmit = (values: any) => {
        const filteredValues = Object.fromEntries(
            Object.entries(values).filter(([_, v]) => v !== "" && v !== undefined)
        );

        const queryString = buildQueryString(filteredValues);
        router.push(`${basePath}${queryString}`);
    };

    const onReset = () => {
        form.reset({});
        router.push(basePath);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {fields.map((field) => (
                        <FormField
                            key={field.name}
                            control={form.control}
                            name={field.name}
                            render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel>{field.label}</FormLabel>
                                    <FormControl>
                                        {field.type === "text" ? (
                                            <Input
                                                placeholder={field.placeholder}
                                                {...formField}
                                            />
                                        ) : field.type === "date" ? (
                                            <Input
                                                type="date"
                                                {...formField}
                                            />
                                        ) : (
                                            <select
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                {...formField}
                                            >
                                                <option value="">전체</option>
                                                {field.options?.map((option) => (
                                                    <option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    ))}
                </div>
                <div className="flex gap-2">
                    <Button type="submit" size="sm">
                        <Search className="mr-2 h-4 w-4" />
                        검색
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={onReset}
                    >
                        <X className="mr-2 h-4 w-4" />
                        초기화
                    </Button>
                </div>
            </form>
        </Form>
    );
}
