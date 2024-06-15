import zod from "zod";
import { Request, Response, NextFunction } from "express";

export const validatePayload = (schema: zod.ZodObject<any, any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({ message: error.errors });
    }
  };
};
