import { Request, Response, NextFunction } from "express";
import GroupService from "./group.service";
import { groupMemberSchema, groupSchema } from "./group.schema";
import { ValidationError } from "@/utils/response-error.util";

export default class GroupController {
  static async getGroups(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await GroupService.getGroups(req.user!);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async getGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = Number(req.params.id);

      if (isNaN(groupId)) {
        throw new ValidationError("Invalid contact ID");
      }

      const result = await GroupService.getGroup(req.user!, groupId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupDto = groupSchema.parse(req.body);

      const result = await GroupService.addGroup(req.user!, groupDto);

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async updateGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupDto = groupSchema.parse(req.body);

      const groupId = Number(req.params.id);

      if (isNaN(groupId)) {
        throw new ValidationError("Invalid contact ID");
      }

      const result = await GroupService.updateGroup(
        req.user!,
        groupId,
        groupDto,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const groupId = Number(req.params.id);

      if (isNaN(groupId)) {
        throw new ValidationError("Invalid contact ID");
      }

      const result = await GroupService.deleteGroup(req.user!, groupId);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addGroupMember(req: Request, res: Response, next: NextFunction) {
    try {
      const groupMemberDto = groupMemberSchema.parse(req.body);

      const groupId = Number(req.params.id);

      if (isNaN(groupId)) {
        throw new ValidationError("Invalid contact ID");
      }

      const result = await GroupService.addGroupMember(
        req.user!,
        groupId,
        groupMemberDto,
      );

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteGroupMember(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const groupMemberDto = groupMemberSchema.parse(req.body);

      const groupId = Number(req.params.id);

      if (isNaN(groupId)) {
        throw new ValidationError("Invalid contact ID");
      }

      const result = await GroupService.deleteGroupMember(
        req.user!,
        groupId,
        groupMemberDto,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
