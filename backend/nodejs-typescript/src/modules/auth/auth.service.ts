import bcrypt from "bcrypt";
import { LoginDto, RegisterDto } from "./auth.schema";
import User from "@/models/user";
import Session from "@/models/session";
import moment from "@/libs/moment";
import { ValidationError } from "@/utils/response-error.util";

export default class AuthService {
  static async register(registerDto: RegisterDto) {
    await User.transaction(async (trx) => {
      const existingUser = await User.query(trx)
        .where("email", registerDto.email)
        .orWhere("phone_number", registerDto.phoneNumber)
        .first()
        .forUpdate();

      if (existingUser) {
        throw new ValidationError("User already exists");
      }

      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      await User.query(trx).insert({
        name: registerDto.name,
        email: registerDto.email,
        phone_number: registerDto.phoneNumber,
        password: hashedPassword,
        bio: registerDto.bio,
      });
    });

    return {
      message: "User registered successfully",
    };
  }

  static async login(loginDto: LoginDto) {
    const user = await User.query()
      .where("email", loginDto.emailOrPhoneNumber)
      .orWhere("phone_number", loginDto.emailOrPhoneNumber)
      .first();

    if (!user) {
      throw new ValidationError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ValidationError("Invalid password");
    }

    const session = await Session.query().insert({
      user_id: user.id,
      expires_at: moment().add(1, "day").unix(),
    });

    return {
      message: "User logged in successfully",
      data: {
        sessionId: session.id,
        expiresAt: session.expires_at,
      },
    };
  }
}
