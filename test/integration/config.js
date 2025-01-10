const config = {
  baseURL: process.env.BASE_URL,
  knex: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST ?? "",
      port: Number(process.env.DATABASE_PORT) ?? 5432,
      database: process.env.DATABASE_NAME ?? "",
      user: process.env.DATABASE_USER ?? "",
      password: process.env.DATABASE_PASSWORD ?? "",
    },
  },
};

export default config;
