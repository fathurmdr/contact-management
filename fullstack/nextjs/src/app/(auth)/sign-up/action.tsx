"use server";

import bcrypt from "bcrypt";
import { signUpSchema } from "@/schemas/auth.schema";
import User from "@/server/models/user";
import { ActionError, handleError } from "@/server/utils/error.util";

export async function signUp(payload: any) {
  try {
    const signUpDto = signUpSchema.parse(payload);
    await User.transaction(async (trx) => {
      const existingUser = await User.query(trx)
        .where("email", signUpDto.email)
        .orWhere("phone_number", signUpDto.phoneNumber)
        .first()
        .forUpdate();

      if (existingUser) {
        throw new ActionError("Email or phone number already used");
      }

      const hashedPassword = await bcrypt.hash(signUpDto.password, 10);

      await User.query(trx).insert({
        name: signUpDto.name,
        email: signUpDto.email,
        phone_number: signUpDto.phoneNumber,
        password: hashedPassword,
        bio: signUpDto.bio,
      });
    });
  } catch (error) {
    return handleError("signUp", error);
  }
}
