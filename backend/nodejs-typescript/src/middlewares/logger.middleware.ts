import { NextFunction, Request, Response } from "express";
import logger from "@/libs/logger";

export default function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (req.error) {
      logger.error({
        type: "http",
        ip: req.ip,
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        message: req.error.message,
        stack: req.error.stack,
        duration: duration,
      });
    } else {
      logger.info({
        type: "http",
        ip: req.ip,
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        duration: duration,
      });
    }
  });

  next();
}
