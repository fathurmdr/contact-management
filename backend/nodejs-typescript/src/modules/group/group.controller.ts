import { Request, Response, NextFunction } from "express";
import GroupService from "./group.service";
import { groupMemberSchema, groupSchema } from "./group.schema";

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
      const result = await GroupService.getGroup(
        req.user!,
        Number(req.params.id),
      );

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

      const result = await GroupService.updateGroup(
        req.user!,
        Number(req.params.id),
        groupDto,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await GroupService.deleteGroup(
        req.user!,
        Number(req.params.id),
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  static async addGroupMember(req: Request, res: Response, next: NextFunction) {
    try {
      const groupMemberDto = groupMemberSchema.parse(req.body);

      const result = await GroupService.addGroupMember(
        req.user!,
        Number(req.params.id),
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

      const result = await GroupService.deleteGroupMember(
        req.user!,
        Number(req.params.id),
        groupMemberDto,
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
