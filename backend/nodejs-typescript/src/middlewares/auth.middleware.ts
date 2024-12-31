import { NextFunction, Request, Response } from "express";
import { AuthorizationError } from "@/utils/response-error.util";

export default async function authMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  try {
    if (!req.user) {
      throw new AuthorizationError();
    }
  } catch (error) {
    next(error);
  }

  next();
}
