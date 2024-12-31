import express from "express";
import cors from "cors";
import loggerMiddleware from "./middlewares/logger.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import formidableMiddleware from "./middlewares/formidable.middleware";
import mainRouter from "./modules/main.router";
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

app.use("/", mainRouter);

app.use(errorMiddleware);

export default app;
