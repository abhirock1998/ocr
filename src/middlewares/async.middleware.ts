import { Request, Response, NextFunction } from "express";

/**
 * Wraps an async function to catch any errors that may occur.
 *
 * @param fn - The async function to wrap.
 * @returns A function that catches any errors that may occur.
 */
export const asyncHandler =
  <T extends (...args: any[]) => Promise<any>>(fn: T) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);
