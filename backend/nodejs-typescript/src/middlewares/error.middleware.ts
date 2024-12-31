import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ResponseError } from "@/utils/response-error.util";

export default async function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!error) {
    next();
    return;
  }

  req.error = error;

  if (error instanceof ResponseError) {
    res.status(error.status).json({
      errorMsg: error.message,
      errors: error.errors,
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(400).json({
      errorMsg: "Validation error",
      errors: error.issues,
    });
    return;
  }

  res.status(500).json({
    errorMsg: "Something went wrong. Check logs for detail errors!",
  });
}
