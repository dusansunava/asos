import z from "zod";

export const PaginationSchema = z.object({
  body: z.object({
    sorting: z.array(
      z.object({
        desc: z.boolean(),
        id: z.string(),
      })
    ),
    pagination: z.object({
      pageIndex: z.number(),
      pageSize: z.number(),
    }),
    search: z.object({})
  }),
});

export type PaginationRequest = z.infer<typeof PaginationSchema>["body"];
export type PaginationResponse = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  data: any[];
};
