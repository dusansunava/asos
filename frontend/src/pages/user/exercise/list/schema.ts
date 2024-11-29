import { z } from "zod"

export type Exercise = {
  id: string,
  type: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  description: string,
  bodyPart: string,
  intensity: string,
  logo: string
}

export const ChartSchema = z.object({
  dateFrom: z.date().default(new Date()),
  dateTo: z.date().default(new Date())
}) 

export type ChartSchemaT = z.infer<typeof ChartSchema>