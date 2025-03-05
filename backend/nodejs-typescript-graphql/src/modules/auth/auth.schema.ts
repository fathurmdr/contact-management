import z from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  password: z.string().min(6),
  bio: z.string().optional().nullable(),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  emailOrPhoneNumber: z.string(),
  password: z.string().min(6),
});

export type LoginDto = z.infer<typeof loginSchema>;
