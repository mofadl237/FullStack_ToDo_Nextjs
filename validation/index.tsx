import { z } from "zod"

export const formAddSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  body: z.string().max(50, {
    message: "Description Length 50 character",
  }).optional(),
  completed:z.boolean(),
})