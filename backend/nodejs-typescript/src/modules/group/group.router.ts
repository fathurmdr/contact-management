import express from "express";
import GroupController from "./group.controller";
import authMiddleware from "@/middlewares/auth.middleware";

const groupRouter = express.Router();

groupRouter.use(authMiddleware);

groupRouter.get("/", GroupController.getGroups);
groupRouter.get("/:id", GroupController.getGroup);
groupRouter.post("/", GroupController.addGroup);
groupRouter.put("/:id", GroupController.updateGroup);
groupRouter.delete("/:id", GroupController.deleteGroup);
groupRouter.post("/:id/member", GroupController.addGroupMember);
groupRouter.delete("/:id/member", GroupController.deleteGroupMember);

export default groupRouter;
