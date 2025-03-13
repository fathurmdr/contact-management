import dialCodesData from "@/data/dial-code";
import { handleGraphQLError } from "@/utils/handle-error.util";

const contactResolver = {
  Query: {
    dialCodes: async () => {
      try {
        return dialCodesData;
      } catch (error) {
        handleGraphQLError(error);
      }
    },
  },
};

export default contactResolver;
