import { contactSchema } from "./contact.schema";
import ContactService from "./contact.service";
import {
  AuthorizationError,
  handleGraphQLError,
  ValidationError,
} from "@/utils/handle-error.util";

const contactResolver = {
  Query: {
    contacts: async (_: any, __: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const contacts = await ContactService.getContacts(context.user);

        return contacts;
      } catch (error) {
        handleGraphQLError(error);
      }
    },
    contact: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const contact = await ContactService.getContact(context.user, args.id);

        return contact;
      } catch (error) {
        handleGraphQLError(error);
      }
    },
  },
  Mutation: {
    addContact: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const contactDto = contactSchema.parse(args);

        await ContactService.addContact(context.user, contactDto);

        return "Contact added successfully";
      } catch (error) {
        handleGraphQLError(error);
      }
    },
    updateContact: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const contactDto = contactSchema.parse(args);

        const contactId = Number(args.id);

        if (isNaN(contactId)) {
          throw new ValidationError("Invalid contact ID");
        }

        await ContactService.updateContact(context.user, contactId, contactDto);

        return "Contact updated successfully";
      } catch (error) {
        handleGraphQLError(error);
      }
    },
    deleteContact: async (_: any, args: any, context: GraphQLContext) => {
      try {
        if (!context.user) {
          throw new AuthorizationError();
        }

        const contactId = Number(args.id);

        if (isNaN(contactId)) {
          throw new ValidationError("Invalid contact ID");
        }

        await ContactService.deleteContact(context.user, contactId);

        return "Contact deleted successfully";
      } catch (error) {
        handleGraphQLError(error);
      }
    },
  },
};

export default contactResolver;
