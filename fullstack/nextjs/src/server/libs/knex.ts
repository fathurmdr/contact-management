import knexLib from "knex";
import { types } from "pg";
import { serverConfig } from "@/config";

types.setTypeParser(1700, (val) => parseFloat(val));

const knex = knexLib(serverConfig.knex);

export default knex;
