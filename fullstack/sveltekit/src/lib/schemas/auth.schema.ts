import z from "zod";

export const signUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string().min(10),
  password: z.string().min(6),
  bio: z.string().optional().nullable(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
