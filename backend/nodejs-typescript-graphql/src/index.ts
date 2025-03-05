import "dotenv/config";

import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import config from "./config";
import logger from "./libs/logger";
import { typeDefs, resolvers } from "./graphql-config";
import app from "./app";
import errorMiddleware from "./middlewares/error.middleware";

const host = config.host;
const port = config.port;

const httpServer = http.createServer(app);

const server = new ApolloServer<GraphQLContext>({
  typeDefs,
  resolvers,
  includeStacktraceInErrorResponses: false,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function main() {
  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({ user: req.user }),
    }) as any,
  );

  app.use(errorMiddleware);

  httpServer.listen(port, () => {
    logger.info(`Server running at http://${host}:${port}`);
  });
}

main();
