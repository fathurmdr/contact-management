import { Request, Response, NextFunction } from "express";
import ContactService from "./contact.service";
import { contactSchema } from "./contact.schema";
import { ValidationError } from "@/utils/response-error.util";

export default class ContactController {
  static async getContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ContactService.getContacts(req.user!);

      res.status(200).json(result);
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

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addContact(req: Request, res: Response, next: NextFunction) {
    try {
      const contactDto = contactSchema.parse(req.body);

      const result = await ContactService.addContact(req.user!, contactDto);

      res.status(201).json(result);
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

      const result = await ContactService.updateContact(
        req.user!,
        contactId,
        contactDto,
      );

      res.status(200).json(result);
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

      const result = await ContactService.deleteContact(req.user!, contactId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
