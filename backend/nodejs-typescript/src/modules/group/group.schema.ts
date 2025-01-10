import z from "zod";

export const groupSchema = z.object({
  name: z.string(),
  description: z.string().nullable().default(null),
});

export type GroupDto = z.infer<typeof groupSchema>;

export const groupMemberSchema = z.object({
  contactId: z.number(),
});

export type GroupMemberDto = z.infer<typeof groupMemberSchema>;
