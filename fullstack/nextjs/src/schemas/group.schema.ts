import z from "zod";

export const groupSchema = z.object({
  name: z.string(),
  description: z.string().nullable().default(null),
});

export const groupMemberSchema = z.object({
  contactId: z.number(),
});
