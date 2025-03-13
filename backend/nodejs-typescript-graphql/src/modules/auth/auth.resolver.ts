import AuthService from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";
import {
  AuthorizationError,
  handleGraphQLError,
} from "@/utils/handle-error.util";

const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        return context.user;
      } catch (error) {
        handleGraphQLError(error);
      }
    },
  },
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
