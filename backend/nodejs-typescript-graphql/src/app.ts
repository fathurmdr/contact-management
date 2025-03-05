import express from "express";
import cors from "cors";
import loggerMiddleware from "./middlewares/logger.middleware";
import formidableMiddleware from "./middlewares/formidable.middleware";
import sessionMiddleware from "./middlewares/session.middleware";

const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(loggerMiddleware);
app.use(formidableMiddleware());

app.use(sessionMiddleware);

export default app;
