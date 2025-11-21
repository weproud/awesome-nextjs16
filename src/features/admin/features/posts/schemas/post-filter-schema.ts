import { z } from "zod";
import { basePaginationSchema, baseSortSchema } from "@/features/admin/lib/filter-schema";

export const postFilterSchema = z
    .object({
        title: z.string().optional(),
        content: z.string().optional(),
        authorName: z.string().optional(),
        createdFrom: z.string().optional(),
        createdTo: z.string().optional(),
    })
    .merge(basePaginationSchema)
    .merge(baseSortSchema);

export type PostFilter = z.infer<typeof postFilterSchema>;

export const postFilterDefaults: Partial<PostFilter> = {
    page: 1,
    pageSize: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
};
