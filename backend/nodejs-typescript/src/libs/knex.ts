import knexLib from "knex";
import { types } from "pg";
import config from "@/config";

types.setTypeParser(1700, (val) => parseFloat(val));

const knex = knexLib(config.knex);

export default knex;
