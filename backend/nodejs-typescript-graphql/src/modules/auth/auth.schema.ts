import z from "zod";
import { isString } from "@/utils/validation.util";

export const registerSchema = z.object({
  name: isString(),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  password: z.string().min(6),
  bio: isString().optional().nullable(),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  emailOrPhoneNumber: isString(),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof loginSchema>;
