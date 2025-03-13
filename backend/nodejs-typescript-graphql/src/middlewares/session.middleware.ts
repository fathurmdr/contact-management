import { NextFunction, Request, Response } from "express";
import z from "zod";
import Session from "@/models/session";
import moment from "@/libs/moment";
import { ResponseError } from "@/utils/response-error.util";

export default async function sessionMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  try {
    const sessionId = z
      .string()
      .uuid()
      .safeParse(req.headers["x-session-id"]).data;

    if (!sessionId) {
      next();
      return;
    }

    const session = await Session.query()
      .withGraphFetched("user")
      .where("id", sessionId)
      .first();

    if (session && session.user) {
      if (session.expires_at < moment().unix()) {
        throw new ResponseError(403, "Session expired");
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        phoneNumber: session.user.phone_number,
        bio: session.user.bio,
      };
    }
  } catch (error) {
    next(error);
  }

  next();
}
