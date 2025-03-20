import z from "zod";

const addressSchema = z.object({
  street: z.string(),
  city: z.string().nullable().default(null),
  district: z.string().nullable().default(null),
  subDistrict: z.string().nullable().default(null),
  postalCode: z.string().nullable().default(null),
});

export const contactSchema = z.object({
  fullName: z.string(),
  nickName: z.string().nullable().default(null),
  phoneNumber: z.string(),
  email: z.string().nullable().default(null),
  addresses: z.array(addressSchema).default([]),
});
