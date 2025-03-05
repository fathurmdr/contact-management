import AuthService from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";
import { handleGraphQLError } from "@/utils/handle-error.util";

const authResolvers = {
  Mutation: {
    register: async (_: any, args: any) => {
      try {
        const registerDto = registerSchema.parse(args);
        await AuthService.register(registerDto);

        return "User registered successfully";
      } catch (error) {
        handleGraphQLError(error);
      }
    },

    login: async (_: any, args: any) => {
      try {
        const loginDto = loginSchema.parse(args);

        const result = await AuthService.login(loginDto);

        return result;
      } catch (error) {
        handleGraphQLError(error);
      }
    },
  },
};

export default authResolvers;
