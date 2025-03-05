import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";

const typesArray = loadFilesSync(path.join(__dirname, "./modules"), {
  extensions: ["graphql"],
});

const resolversArray = loadFilesSync(path.join(__dirname, "./modules"), {
  extensions: ["resolver.ts", "resolver.js"],
  ignoreIndex: true,
});

export const typeDefs = mergeTypeDefs(typesArray);
export const resolvers = mergeResolvers(resolversArray);
