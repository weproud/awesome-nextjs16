import { z } from "zod";

export const basePaginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    pageSize: z.coerce.number().int().positive().max(100).default(10),
});

export const baseSortSchema = z.object({
    sortBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export type BasePagination = z.infer<typeof basePaginationSchema>;
export type BaseSort = z.infer<typeof baseSortSchema>;

export function parseSearchParams<T extends z.ZodTypeAny>(
    searchParams: URLSearchParams | Record<string, string | string[] | undefined>,
    schema: T
): z.infer<T> {
    const params = searchParams instanceof URLSearchParams
        ? Object.fromEntries(searchParams.entries())
        : searchParams;

    const result = schema.safeParse(params);

    if (result.success) {
        return result.data;
    }

    return schema.parse({});
}

export function buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            searchParams.set(key, String(value));
        }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
}
