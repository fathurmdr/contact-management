import express from "express";
import authRouter from "./auth/auth.router";
import contactRouter from "./contact/contact.router";
import groupRouter from "./group/group.router";

const mainRouter = express.Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/contact", contactRouter);
mainRouter.use("/group", groupRouter);

export default mainRouter;
