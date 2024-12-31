const config = {
  nodeEnv: process.env.NODE_ENV ?? "",
  host: process.env.HOST ?? "localhost",
  port: Number(process.env.PORT) ?? 3000,
  knex: {
    client: "pg",
    connection: {
      host: process.env.DATABASE_HOST ?? "",
      port: Number(process.env.DATABASE_PORT) ?? 5432,
      database: process.env.DATABASE_NAME ?? "",
      user: process.env.DATABASE_USER ?? "",
      password: process.env.DATABASE_PASSWORD ?? "",
    },
    debug: process.env.NODE_ENV !== "production",
  },
};

export default config;
