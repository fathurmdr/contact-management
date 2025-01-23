"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { signInSchema } from "@/schemas/auth.schema";
import User from "@/server/models/user";
import Session from "@/server/models/session";
import dayjs from "@/libs/dayjs";
import { ActionError, handleError } from "@/server/utils/error.util";

export async function signIn(payload: any) {
  try {
    const signInDto = signInSchema.parse(payload);
    const user = await User.query().where("email", signInDto.email).first();

    if (!user) {
      throw new ActionError("Email or password is incorrect");
    }

    const isPasswordValid = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ActionError("Email or password is incorrect");
    }

    const session = await Session.query().insert({
      user_id: user.id,
      expires_at: dayjs().add(1, "day").unix(),
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "sessionId",
      value: session.id,
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      expires: dayjs.unix(session.expires_at).toDate(),
    });
  } catch (error) {
    return handleError("signIn", error);
  }
}
