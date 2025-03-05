import { groupMemberSchema, groupSchema } from "./group.schema";
import GroupService from "./group.service";
import {
  AuthorizationError,
  handleGraphQLError,
  ValidationError,
} from "@/utils/handle-error.util";

const groupResolver = {
  Query: {
    groups: async (_: any, __: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const groups = await GroupService.getGroups(context.user);

        return groups;
      } catch (error) {
        handleGraphQLError(error);
      }
    },
    group: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const group = await GroupService.getGroup(context.user, args.id);

        return group;
      } catch (error) {
        handleGraphQLError(error);
      }
    },
  },
  Mutation: {
    addGroup: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const groupDto = groupSchema.parse(args);

        await GroupService.addGroup(context.user, groupDto);

        return "Group added successfully";
      } catch (error) {
        handleGraphQLError(error);
      }
    },
    updateGroup: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const groupDto = groupSchema.parse(args);

        const groupId = Number(args.id);

        if (isNaN(groupId)) {
          throw new ValidationError("Invalid group ID");
        }

        await GroupService.updateGroup(context.user, groupId, groupDto);

        return "Group updated successfully";
      } catch (error) {
        handleGraphQLError(error);
      }
    },
    deleteGroup: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const groupId = Number(args.id);

        if (isNaN(groupId)) {
          throw new ValidationError("Invalid group ID");
        }

        await GroupService.deleteGroup(context.user, groupId);

        return "Group deleted successfully";
      } catch (error) {
        handleGraphQLError(error);
      }
    },
    addGroupMember: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const groupMemberDto = groupMemberSchema.parse(args);

        const groupId = Number(args.id);

        if (isNaN(groupId)) {
          throw new ValidationError("Invalid group ID");
        }

        await GroupService.addGroupMember(
          context.user,
          groupId,
          groupMemberDto,
        );

        return "Group member added successfully";
      } catch (error) {
        handleGraphQLError(error);
      }
    },
    deleteGroupMember: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const groupMemberDto = groupMemberSchema.parse(args);

        const groupId = Number(args.id);

        if (isNaN(groupId)) {
          throw new ValidationError("Invalid group ID");
        }

        await GroupService.deleteGroupMember(
          context.user,
          groupId,
          groupMemberDto,
        );

        return "Group member deleted successfully";
      } catch (error) {
        handleGraphQLError(error);
      }
    },
  },
};

export default groupResolver;
