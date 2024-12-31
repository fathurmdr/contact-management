import { z } from "zod";

export const isString = (message: string = "Must be string/text") =>
  z
    .union([z.string(), z.number()], { errorMap: () => ({ message }) })
    .pipe(z.coerce.string());

export const isNumber = (message: string = "Must be number") =>
  z
    .union([z.string(), z.number()], { errorMap: () => ({ message }) })
    .pipe(z.coerce.number({ message }));

export const isBoolean = (message: string = "Must be boolean") =>
  z.preprocess((value) => {
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "string") {
      return value.toLowerCase() === "true";
    }
    if (typeof value === "number") {
      return value === 1;
    }
    return value;
  }, z.boolean({ message }));

export const isDate = (message: string = "Date invalid") =>
  z
    .union([z.date(), z.string()], { errorMap: () => ({ message }) })
    .pipe(z.coerce.date({ message }));

export const isEmail = (message: string = "Email invalid") =>
  z.string({ message }).email({ message });
