import * as z from "zod";

export const CreatePortfolioSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(30),
    value: z.number(),
    owner_id: z.string().max(36)
  }),
});

export type TCreatePortfolio = z.infer<typeof CreatePortfolioSchema>["body"];

