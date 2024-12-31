import z from "zod";

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  district: z.string(),
  subDistrict: z.string(),
  postalCode: z.string(),
});

export const contactSchema = z.object({
  fullName: z.string(),
  nickName: z.string().optional().nullable(),
  phoneNumber: z.string(),
  email: z.string().optional().nullable(),
  addresses: z.array(addressSchema).default([]),
});

export type ContactDto = z.infer<typeof contactSchema>;
