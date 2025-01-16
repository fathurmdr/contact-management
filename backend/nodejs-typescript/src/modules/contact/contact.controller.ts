import { Request, Response, NextFunction } from "express";
import ContactService from "./contact.service";
import { contactSchema } from "./contact.schema";
import { ValidationError } from "@/utils/response-error.util";

export default class ContactController {
  static async getContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ContactService.getContacts(req.user!);

      res.status(200).json({
        message: "Contacts fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getContact(req: Request, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.id);

      if (isNaN(contactId)) {
        throw new ValidationError("Invalid contact ID");
      }

      const result = await ContactService.getContact(req.user!, contactId);

      res.status(200).json({
        message: "Contact fetched successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addContact(req: Request, res: Response, next: NextFunction) {
    try {
      const contactDto = contactSchema.parse(req.body);

      await ContactService.addContact(req.user!, contactDto);

      res.status(201).json({
        message: "Contact added successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateContact(req: Request, res: Response, next: NextFunction) {
    try {
      const contactDto = contactSchema.parse(req.body);

      const contactId = Number(req.params.id);

      if (isNaN(contactId)) {
        throw new ValidationError("Invalid contact ID");
      }

      await ContactService.updateContact(req.user!, contactId, contactDto);

      res.status(200).json({
        message: "Contact updated successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
      const contactId = Number(req.params.id);

      if (isNaN(contactId)) {
        throw new ValidationError("Invalid contact ID");
      }

      await ContactService.deleteContact(req.user!, contactId);

      res.status(200).json({
        message: "Contact deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
