import zod from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Validates the payload of a request.
 *
 * @param schema - The schema to validate the payload against.
 * @returns A function that validates the payload of a request.
 */
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
