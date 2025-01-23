"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { handleError } from "../utils/error.util";

export async function signOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("sessionId");
  } catch (error) {
    return handleError("signOut", error);
  }

  redirect("/");
}
