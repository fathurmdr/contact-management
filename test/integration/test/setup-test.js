import "dotenv/config";
import knex from "../db/knex";

beforeAll(async () => {});

afterAll(() => {
  knex.destroy();
});
