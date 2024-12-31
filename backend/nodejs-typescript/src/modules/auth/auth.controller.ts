import { Request, Response, NextFunction } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import AuthService from "./auth.service";

export default class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const registerDto = registerSchema.parse(req.body);

      const result = await AuthService.register(registerDto);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const loginDto = loginSchema.parse(req.body);

      const result = await AuthService.login(loginDto);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
