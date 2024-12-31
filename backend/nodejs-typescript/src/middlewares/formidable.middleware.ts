import fs from "fs";
import path from "path";
import { NextFunction, Request, Response } from "express";
import formidable from "formidable";

export default function formidableMiddleware() {
  return async (req: Request, _: Response, next: NextFunction) => {
    const uploadDir = path.join(process.cwd(), "temp");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const form = formidable({
      uploadDir: uploadDir,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      const body: any = {};

      Object.keys(fields).forEach((key) => {
        if (Array.isArray(fields[key])) {
          if (key.includes("[]")) {
            body[key.replace("[]", "")] = fields[key];
          } else if (key.includes("[")) {
            const parts: any[] = key.replace(/\]/g, "").split(/\[|\./);
            let current = body;

            parts.forEach((part, index) => {
              const val = fields[key]![0];
              const isLast = index === parts.length - 1;

              current[part] = isLast
                ? val
                : current[part] || (isNaN(parts[index + 1]) ? {} : []);
              current = current[part];
            });
          } else if (key.includes("{}")) {
            body[key.replace("{}", "")] = JSON.parse(fields[key]![0] ?? "{}");
          } else {
            body[key] = fields[key]![0];
          }
        } else {
          body[key] = fields[key];
        }
      });

      if (req.headers["content-type"]?.includes("multipart/form-data")) {
        req.body = body;
      } else {
        req.body = fields;
      }

      req.files = files;

      next();
    });
  };
}
