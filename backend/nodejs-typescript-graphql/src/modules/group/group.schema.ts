import z from "zod";
import { isNumber, isString } from "@/utils/validation.util";

export const groupSchema = z.object({
  name: isString(),
  description: isString().nullable().default(null),
});

export type GroupDto = z.infer<typeof groupSchema>;

export const groupMemberSchema = z.object({
  contactId: isNumber(),
});

export type GroupMemberDto = z.infer<typeof groupMemberSchema>;
