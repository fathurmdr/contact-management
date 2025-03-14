import z from "zod";
import { isString } from "@/utils/validation.util";

const addressSchema = z.object({
  street: isString(),
  city: isString().nullable().default(null),
  district: isString().nullable().default(null),
  subDistrict: isString().nullable().default(null),
  postalCode: isString().nullable().default(null),
});

export const contactSchema = z.object({
  fullName: isString(),
  nickName: isString().nullable().default(null),
  phoneNumber: isString(),
  email: isString().nullable().default(null),
  addresses: z.array(addressSchema).default([]),
});

export type ContactDto = z.infer<typeof contactSchema>;
