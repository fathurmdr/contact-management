import express from "express";
import ContactController from "./contact.controller";
import authMiddleware from "@/middlewares/auth.middleware";

const contactRouter = express.Router();

contactRouter.use(authMiddleware);

contactRouter.get("/", ContactController.getContacts);
contactRouter.get("/:id", ContactController.getContact);
contactRouter.post("/", ContactController.addContact);
contactRouter.put("/:id", ContactController.updateContact);
contactRouter.delete("/:id", ContactController.deleteContact);

export default contactRouter;
