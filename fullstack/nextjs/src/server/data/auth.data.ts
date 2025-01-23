import { cookies } from "next/headers";
import Session from "../models/session";
import { handleError } from "../utils/error.util";
import dayjs from "@/libs/dayjs";

export async function getAuth(): Promise<Auth | null> {
  try {
    const cookieStore = await cookies();

    const sessionId = cookieStore.get("sessionId")?.value;

    if (!sessionId) {
      return null;
    }

    const session = await Session.query()
      .withGraphFetched("user")
      .where("id", sessionId)
      .where("expires_at", ">", dayjs().unix())
      .first();

    if (!session || !session.user) {
      return null;
    }

    return {
      sessionId: session.id,
      expiresAt: session.expires_at,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        phoneNumber: session.user.phone_number,
        bio: session.user.bio,
      },
    };
  } catch (error) {
    handleError("getAuth", error);
    return null;
  }
}
